/* Manifest-bound generated portraits live in R2 instead of the Worker bundle. */
const unitPortraitPrefix='/portraits/units/';
const unitPortraitSeedPath='/api/internal/unit-portrait-seed';
const unitPortraitBodyLimit=64*1024;
const unitPortraitJson=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const unitPortraitKey=entry=>'system/unit-portraits/v1/'+entry.sha256+'.webp';
function unitPortraitSecretMatches(given,expected){
 if(typeof expected!=='string'||expected.length<24||expected.length>256||typeof given!=='string'||given.length>256)return false;
 let different=given.length^expected.length;for(let i=0;i<expected.length;i++)different|=expected.charCodeAt(i)^(given.charCodeAt(i)||0);return different===0;
}
async function unitPortraitReadJson(request){
 const declared=request.headers.get('Content-Length');if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>unitPortraitBodyLimit))throw Object.assign(Error('Body too large'),{status:413});
 if(!request.body)throw Object.assign(Error('Missing body'),{status:400});
 const reader=request.body.getReader(),chunks=[];let length=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>unitPortraitBodyLimit){await reader.cancel();throw Object.assign(Error('Body too large'),{status:413});}chunks.push(value);}}finally{reader.releaseLock();}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
 try{return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));}catch{throw Object.assign(Error('Invalid JSON'),{status:400});}
}
async function unitPortraitSeed(request,env,manifest){
 if(!env?.UNIT_PORTRAIT_SEED_TOKEN)return unitPortraitJson({error:'Not found'},404);
 if(request.method!=='POST')return unitPortraitJson({error:'Method not allowed'},405);
 if(!unitPortraitSecretMatches(request.headers.get('X-Unit-Portrait-Seed'),env.UNIT_PORTRAIT_SEED_TOKEN))return unitPortraitJson({error:'Forbidden'},403);
 if(!env.BUCKET?.put)return unitPortraitJson({error:'Portrait storage unavailable'},503);
 let value;try{value=await unitPortraitReadJson(request);}catch(error){return unitPortraitJson({error:error.message},error.status||400);}
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!['path','base64'].includes(k))||typeof value.path!=='string'||typeof value.base64!=='string')return unitPortraitJson({error:'Invalid portrait request'},400);
 const entry=Object.hasOwn(manifest.assets,value.path)?manifest.assets[value.path]:null;if(!entry)return unitPortraitJson({error:'Unknown portrait'},404);
 if(!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value.base64))return unitPortraitJson({error:'Invalid base64'},400);
 let bytes;try{bytes=Uint8Array.from(atob(value.base64),c=>c.charCodeAt(0));}catch{return unitPortraitJson({error:'Invalid base64'},400);}
 if(bytes.byteLength!==entry.bytes||bytes.byteLength<12||String.fromCharCode(...bytes.subarray(0,4))!=='RIFF'||String.fromCharCode(...bytes.subarray(8,12))!=='WEBP')return unitPortraitJson({error:'Portrait size or type mismatch'},400);
 const sha256=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),v=>v.toString(16).padStart(2,'0')).join('');
 if(sha256!==entry.sha256)return unitPortraitJson({error:'Portrait hash mismatch'},400);
 await env.BUCKET.put(unitPortraitKey(entry),bytes,{httpMetadata:{contentType:'image/webp',cacheControl:'public, max-age=3600'},customMetadata:{sha256}});
 return unitPortraitJson({ok:true,path:value.path,bytes:bytes.byteLength,sha256});
}
export async function handleUnitPortraitAssets(request,env,manifest){
 const url=new URL(request.url);if(url.pathname===unitPortraitSeedPath)return unitPortraitSeed(request,env,manifest);
 if(!url.pathname.startsWith(unitPortraitPrefix))return null;
 if(!['GET','HEAD'].includes(request.method))return unitPortraitJson({error:'Method not allowed'},405);
 let path;try{path=decodeURIComponent(url.pathname);}catch{return unitPortraitJson({error:'Bad request'},400);}
 const entry=Object.hasOwn(manifest.assets,path)?manifest.assets[path]:null;if(!entry)return unitPortraitJson({error:'Not found'},404);
 if(!env?.BUCKET?.get)return unitPortraitJson({error:'Portrait storage unavailable'},503);
 const key=unitPortraitKey(entry),object=request.method==='HEAD'&&env.BUCKET.head?await env.BUCKET.head(key):await env.BUCKET.get(key);
 if(!object)return unitPortraitJson({error:'Not found'},404);
 if(Number.isFinite(object.size)&&object.size!==entry.bytes)return unitPortraitJson({error:'Portrait storage mismatch'},503);
 const headers={'Content-Type':'image/webp','Content-Length':String(entry.bytes),'Cache-Control':'public, max-age=3600','ETag':'"'+entry.sha256+'"','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
 if(request.headers.get('If-None-Match')?.split(',').some(tag=>tag.trim()===headers.ETag||tag.trim()==='W/'+headers.ETag||tag.trim()==='*')){delete headers['Content-Length'];return new Response(null,{status:304,headers});}
 return new Response(request.method==='HEAD'?null:object.body,{headers});
}
