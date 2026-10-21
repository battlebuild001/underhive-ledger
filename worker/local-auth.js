/* Password identities coexist with the original trusted Sites identities. */
const SESSION_COOKIE='__Host-uk-session',MODE_COOKIE='__Host-uk-auth-mode';
const SESSION_SECONDS=30*24*60*60,ITERATIONS=100000,MAX_AUTH_BODY=8192,WINDOW_SECONDS=900;
const encoder=new TextEncoder();
class AuthError extends Error{constructor(status,message,headers={}){super(message);this.status=status;this.headers=headers;}}
const required=(test,message,status=400)=>{if(!test)throw new AuthError(status,message);};
const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const response=(value,status=200,extra={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
const cookie=(request,name)=>{const matches=(request.headers.get('cookie')||'').split(';').map(part=>part.trim()).filter(part=>part.startsWith(name+'='));return matches.length===1?matches[0].slice(name.length+1):null;};
const hasSessionCookie=request=>(request.headers.get('cookie')||'').split(';').some(part=>part.trim().startsWith(SESSION_COOKIE+'='));
const randomBytes=size=>crypto.getRandomValues(new Uint8Array(size));
const hex=bytes=>Array.from(bytes,value=>value.toString(16).padStart(2,'0')).join('');
const randomToken=()=>btoa(String.fromCharCode(...randomBytes(32))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const sha256=async value=>hex(new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value))));
const timestamp=()=>new Date().toISOString();
const cookies=(token,seconds=SESSION_SECONDS)=>[
 `${SESSION_COOKIE}=${token||''}; Path=/; Max-Age=${token?seconds:0}; HttpOnly; Secure; SameSite=Lax`,
 `${MODE_COOKIE}=local; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`
];
function withCookies(value,status,values){const out=response(value,status);for(const value of values)out.headers.append('Set-Cookie',value);return out;}
function publicProfile(row){let preferences={};try{preferences=JSON.parse(row.preferences)}catch{}return {id:row.id,username:row.username,contactEmail:row.contact_email,identityEmail:row.identity_email,preferences,createdAt:row.created_at,lastSignIn:row.last_seen_at};}
function loginInput(value){
 required(typeof value==='string','아이디를 입력하세요.');const loginId=value.normalize('NFKC').trim();
 required(/^[\p{L}\p{N}_.-]{3,32}$/u.test(loginId),'아이디는 3~32자의 한글·영문·숫자와 _, ., -를 사용할 수 있습니다.');
 return {loginId,loginKey:loginId.toLowerCase().normalize('NFKC')};
}
function passwordInput(value){required(typeof value==='string'&&value.length>=8&&value.length<=128,'비밀번호는 8~128자로 입력하세요.');return value;}
async function jsonBody(request){
 required((request.headers.get('content-type')||'').toLowerCase().includes('application/json'),'JSON 요청이 필요합니다.',415);
 required(Number(request.headers.get('content-length')||0)<=MAX_AUTH_BODY,'요청이 너무 큽니다.',413);
 required(request.body,'입력 값이 필요합니다.');
 const reader=request.body.getReader(),chunks=[];let size=0;
 for(;;){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>MAX_AUTH_BODY){await reader.cancel();throw new AuthError(413,'요청이 너무 큽니다.');}chunks.push(part.value);}
 const bytes=new Uint8Array(size);let offset=0;for(const part of chunks){bytes.set(part,offset);offset+=part.length;}
 let value;try{value=JSON.parse(new TextDecoder().decode(bytes));}catch{throw new AuthError(400,'JSON 형식이 올바르지 않습니다.');}
 required(object(value),'입력 형식이 올바르지 않습니다.');return value;
}
function protectOrigin(request){
 const url=new URL(request.url),origin=request.headers.get('origin'),fetchSite=request.headers.get('sec-fetch-site');
 required(url.protocol==='https:','HTTPS 연결이 필요합니다.');
 required(!origin||origin===url.origin,'허용되지 않은 요청입니다.',403);
 required(!fetchSite||fetchSite!=='cross-site','허용되지 않은 요청입니다.',403);
}
async function rate(db,scope,key,limit){
 const now=Math.floor(Date.now()/1000),hashed=scope+':'+await sha256(key),cutoff=now-WINDOW_SECONDS;
 const current=await db.prepare('INSERT INTO auth_rate_limits(key,window_start,attempts) VALUES(?,?,1) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN auth_rate_limits.window_start<=? THEN 1 ELSE auth_rate_limits.attempts+1 END,window_start=CASE WHEN auth_rate_limits.window_start<=? THEN excluded.window_start ELSE auth_rate_limits.window_start END RETURNING attempts,window_start').bind(hashed,now,cutoff,cutoff).first();
 required(current,'인증 요청을 처리하지 못했습니다.',503);
 if(current.attempts>limit)throw new AuthError(429,'요청이 너무 많습니다. 잠시 후 다시 시도하세요.',{'Retry-After':String(Math.max(1,current.window_start+WINDOW_SECONDS-now))});
}
async function limits(request,db,scope,key,ipLimit,keyLimit){
 await rate(db,scope+'-ip',request.headers.get('cf-connecting-ip')||'unknown',ipLimit);
 await rate(db,scope+'-id',key,keyLimit);
 await db.prepare('DELETE FROM auth_rate_limits WHERE window_start<?').bind(Math.floor(Date.now()/1000)-172800).run();
}
async function derive(password,salt,iterations=ITERATIONS){
 const material=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
 return hex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:encoder.encode(salt),iterations},material,256)));
}
function equal(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==64||b.length!==64)return false;let different=0;for(let i=0;i<64;i++)different|=a.charCodeAt(i)^b.charCodeAt(i);return different===0;}
async function validPassword(password,credentials){
 const salt=credentials?.password_salt||'00000000000000000000000000000000';
 const digest=await derive(password,salt);
 return !!credentials&&credentials.password_iterations===ITERATIONS&&equal(digest,credentials.password_hash);
}
const sessionStatement=(db,tokenHash,userId,passwordVersion,expiresAt,createdAt)=>db.prepare('INSERT INTO auth_sessions(token_hash,user_id,password_version,expires_at,created_at) SELECT ?,user_id,password_version,?,? FROM local_credentials WHERE user_id=? AND password_version=?').bind(tokenHash,expiresAt,createdAt,userId,passwordVersion);
async function localSession(request,db){
 const token=cookie(request,SESSION_COOKIE);if(!db||!token||!/^[A-Za-z0-9_-]{43}$/.test(token))return null;
 const tokenHash=await sha256(token),now=Math.floor(Date.now()/1000);
 const row=await db.prepare('SELECT p.*,c.login_id,c.password_version,s.token_hash,s.expires_at FROM auth_sessions s JOIN local_credentials c ON c.user_id=s.user_id AND c.password_version=s.password_version JOIN profiles p ON p.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(tokenHash,now).first();
 return row?{row,tokenHash}:null;
}
export function shouldUseSitesIdentity(request){return cookie(request,MODE_COOKIE)!=='local'&&!hasSessionCookie(request);}
export async function resolveLocalIdentity(request,db){
 const session=await localSession(request,db);if(!session)return null;const p=session.row;
 return {id:p.id,email:p.identity_email||'',authMethod:'password',loginId:p.login_id};
}
export async function resolveRequestIdentity(request,db){
 const local=await resolveLocalIdentity(request,db);if(local)return local;
 if(!shouldUseSitesIdentity(request))return null;
 const id=request.headers.get('oai-authenticated-user-id');if(!id||id.length>256)return null;
 return {id,email:request.headers.get('oai-authenticated-user-email')||'',authMethod:'chatgpt'};
}
async function nativeProfile(db,identity){
 let profile=await db.prepare('SELECT * FROM profiles WHERE id=?').bind(identity.id).first();if(profile)return profile;
 const at=timestamp(),suffix=identity.id.replace(/[^a-z0-9]/gi,'').slice(-10)||crypto.randomUUID().slice(0,8),username='Scummer_'+suffix;
 await db.prepare('INSERT INTO profiles(id,username,username_key,identity_email,contact_email,preferences,created_at,last_seen_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING').bind(identity.id,username,username.toLowerCase(),identity.email||'','','{}',at,at).run();
 return await db.prepare('SELECT * FROM profiles WHERE id=?').bind(identity.id).first();
}
async function sessionResult(db,userId,loginId){const row=await db.prepare('SELECT * FROM profiles WHERE id=?').bind(userId).first();return {ok:true,profile:publicProfile(row),auth:{method:'password',loginId,hasPassword:true}};}
async function register(request,db,attach=false){
 const body=await jsonBody(request),{loginId,loginKey}=loginInput(body.loginId),password=passwordInput(body.password);
 let identity=null;
 if(attach){identity=await resolveRequestIdentity(request,db);required(identity?.authMethod==='chatgpt','기존 ChatGPT 계정으로 로그인한 뒤 아이디를 설정하세요.',401);await nativeProfile(db,identity);}
 await limits(request,db,attach?'credentials':'register',attach?identity.id:loginKey,attach?20:12,attach?5:5);
 const existing=await db.prepare('SELECT user_id FROM local_credentials WHERE login_key=?'+(attach?' OR user_id=?':'')).bind(loginKey,...(attach?[identity.id]:[])).first();required(!existing,'이미 사용 중이거나 설정된 아이디입니다.',409);
 const userId=attach?identity.id:'local-'+crypto.randomUUID(),salt=hex(randomBytes(16)),digest=await derive(password,salt),token=randomToken(),tokenHash=await sha256(token),now=Math.floor(Date.now()/1000),at=timestamp();
 const statements=[];
 if(!attach)statements.push(db.prepare('INSERT INTO profiles(id,username,username_key,identity_email,contact_email,preferences,created_at,last_seen_at) VALUES(?,?,?,?,?,?,?,?)').bind(userId,loginId,loginKey,'','','{}',at,at));
 statements.push(db.prepare('INSERT INTO local_credentials(user_id,login_id,login_key,password_salt,password_hash,password_iterations,password_version,created_at,updated_at) VALUES(?,?,?,?,?,?,1,?,?)').bind(userId,loginId,loginKey,salt,digest,ITERATIONS,at,at));
 statements.push(sessionStatement(db,tokenHash,userId,1,now+SESSION_SECONDS,now));
 try{const result=await db.batch(statements);required(result.at(-1)?.meta.changes,'가입 요청을 다시 시도하세요.',409);}catch(error){if(String(error.message).includes('UNIQUE'))throw new AuthError(409,'이미 사용 중이거나 설정된 아이디입니다.');throw error;}
 return withCookies(await sessionResult(db,userId,loginId),attach?200:201,cookies(token));
}
async function login(request,db){
 const body=await jsonBody(request),{loginKey}=loginInput(body.loginId),password=passwordInput(body.password);
 await limits(request,db,'login',loginKey,60,15);
 const credentials=await db.prepare('SELECT * FROM local_credentials WHERE login_key=?').bind(loginKey).first();
 required(await validPassword(password,credentials),'아이디 또는 비밀번호가 올바르지 않습니다.',401);
 const token=randomToken(),tokenHash=await sha256(token),now=Math.floor(Date.now()/1000),at=timestamp();
 const result=await db.batch([sessionStatement(db,tokenHash,credentials.user_id,credentials.password_version,now+SESSION_SECONDS,now),db.prepare('UPDATE profiles SET last_seen_at=? WHERE id=?').bind(at,credentials.user_id),db.prepare('DELETE FROM auth_sessions WHERE expires_at<=?').bind(now)]);
 required(result[0].meta.changes,'아이디 또는 비밀번호가 올바르지 않습니다.',401);
 return withCookies(await sessionResult(db,credentials.user_id,credentials.login_id),200,cookies(token));
}
async function changePassword(request,db){
 const session=await localSession(request,db);required(session,'아이디와 비밀번호로 다시 로그인하세요.',401);
 const body=await jsonBody(request),currentPassword=passwordInput(body.currentPassword),newPassword=passwordInput(body.newPassword);required(currentPassword!==newPassword,'새 비밀번호는 현재 비밀번호와 달라야 합니다.');
 await limits(request,db,'password',session.row.id,30,10);
 const credentials=await db.prepare('SELECT * FROM local_credentials WHERE user_id=?').bind(session.row.id).first();required(await validPassword(currentPassword,credentials),'현재 비밀번호가 올바르지 않습니다.',401);
 const salt=hex(randomBytes(16)),digest=await derive(newPassword,salt),version=credentials.password_version+1,token=randomToken(),tokenHash=await sha256(token),now=Math.floor(Date.now()/1000),at=timestamp();
 const guard='EXISTS(SELECT 1 FROM local_credentials WHERE user_id=? AND password_version=? AND password_salt=?)';
 const result=await db.batch([
  db.prepare('UPDATE local_credentials SET password_salt=?,password_hash=?,password_version=?,updated_at=? WHERE user_id=? AND password_version=?').bind(salt,digest,version,at,credentials.user_id,credentials.password_version),
  db.prepare('DELETE FROM auth_sessions WHERE user_id=? AND '+guard).bind(credentials.user_id,credentials.user_id,version,salt),
  db.prepare('INSERT INTO auth_sessions(token_hash,user_id,password_version,expires_at,created_at) SELECT ?,user_id,password_version,?,? FROM local_credentials WHERE user_id=? AND password_version=? AND password_salt=?').bind(tokenHash,now+SESSION_SECONDS,now,credentials.user_id,version,salt)
 ]);
 required(result[0].meta.changes&&result[2].meta.changes,'다른 요청에서 비밀번호가 변경되었습니다. 다시 로그인하세요.',409);
 return withCookies(await sessionResult(db,credentials.user_id,credentials.login_id),200,cookies(token));
}
export async function handleLocalAuth(request,env){
 const url=new URL(request.url);if(!url.pathname.startsWith('/api/auth/'))return null;
 try{
  required(env.DB,'서버 저장소를 연결하는 중입니다.',503);const db=env.DB,path=url.pathname.replace(/\/$/,''),method=request.method;
  if(method!=='GET')protectOrigin(request);
  if(path==='/api/auth/session'&&method==='GET'){
   const identity=await resolveRequestIdentity(request,db);required(identity,'로그인이 필요합니다.',401);
   const profile=await nativeProfile(db,identity),credentials=await db.prepare('SELECT login_id FROM local_credentials WHERE user_id=?').bind(identity.id).first();
   return response({authenticated:true,profile:publicProfile(profile),auth:{method:identity.authMethod,loginId:credentials?.login_id||null,hasPassword:!!credentials}});
  }
  if(path==='/api/auth/register'&&method==='POST')return await register(request,db);
  if(path==='/api/auth/login'&&method==='POST')return await login(request,db);
  if(path==='/api/auth/credentials'&&method==='POST')return await register(request,db,true);
  if(path==='/api/auth/change-password'&&method==='POST')return await changePassword(request,db);
  if((path==='/api/auth/logout'||path==='/api/auth/use-chatgpt')&&method==='POST'){
   const token=cookie(request,SESSION_COOKIE);if(token&&/^[A-Za-z0-9_-]{43}$/.test(token))await db.prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await sha256(token)).run();
   const values=cookies(null);if(path==='/api/auth/use-chatgpt')values[1]=`${MODE_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
   return withCookies({ok:true,authenticated:false},200,values);
  }
  return response({error:'요청한 인증 기능을 찾을 수 없습니다.'},404);
 }catch(error){if(error instanceof AuthError)return response({error:error.message},error.status,error.headers);if(String(error.message).includes('UNIQUE'))return response({error:'이미 사용 중이거나 설정된 아이디입니다.'},409);return response({error:'인증 요청을 처리하지 못했습니다. 잠시 후 다시 시도하세요.'},500);}
}
