import {handleApi} from './account-api.js';

// The build replaces this marker with the checked-in static app assets.
const ASSETS = __MUNDA_ASSETS__;
const TYPES = {html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8',json:'application/json; charset=utf-8',webmanifest:'application/manifest+json; charset=utf-8',svg:'image/svg+xml',webp:'image/webp',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',avif:'image/avif',woff2:'font/woff2'};

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(url.pathname.startsWith('/api/')&&env.UK_ACCOUNT_ERASE_TOKEN){
      if(url.pathname!=='/api/_maintenance/erase-accounts')return Response.json({error:'Account maintenance in progress.'},{status:503,headers:{'Cache-Control':'no-store','Retry-After':'60'}});
      if(request.method!=='POST'||request.headers.get('Authorization')!=='Bearer '+env.UK_ACCOUNT_ERASE_TOKEN)return new Response('Forbidden',{status:403});
      const body=await request.json();if(body.confirm!=='DELETE_ALL_ACCOUNTS'||body.expected_profiles!==4)return new Response('Invalid confirmation',{status:400});
      const tables=['campaign_join_requests','campaign_access','campaign_enrollments','campaign_deletions','notifications','friendships','auth_sessions','local_credentials','documents','uploads','shared_campaigns','profiles','auth_rate_limits'];
      const counts=async()=>Object.fromEntries(await Promise.all(tables.map(async t=>[t,(await env.DB.prepare('SELECT COUNT(*) AS n FROM '+t).first()).n])));
      const before=await counts();if(before.profiles!==body.expected_profiles||before.uploads!==0)return Response.json({error:'Account set changed',counts:before},{status:409});
      const docs=(await env.DB.prepare('SELECT state FROM documents').all()).results;
      if(docs.some(row=>{const s=JSON.parse(row.state);return s.gangs?.length||s.campaigns?.length}))return Response.json({error:'Nonempty game records require review'},{status:409});
      const campaigns=(await env.DB.prepare('SELECT snapshot FROM shared_campaigns').all()).results;
      if(campaigns.some(row=>{const s=JSON.parse(row.snapshot);return s.gangs?.length||s.campaign?.members?.length}))return Response.json({error:'Nonempty shared roster requires review'},{status:409});
      await env.DB.batch(tables.map(t=>env.DB.prepare('DELETE FROM '+t)));
      return Response.json({ok:true,before,after:await counts()},{headers:{'Cache-Control':'no-store'}});
    }
    if(url.pathname.startsWith('/api/'))return handleApi(request,env,ctx);
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    let path;
    try{path=decodeURIComponent(url.pathname)}catch{return new Response('Bad request',{status:400})}
    if(/^\/learn(?:\/|$)/.test(path))return new Response(null,{status:302,headers:{Location:'/','Cache-Control':'no-store'}});
    if(path==='/')path='/index.html';
    let source=ASSETS[path];
    if(source===undefined&&/^\/(gang|fighter|campaigns|account|join)(\/|$)/.test(path)){path='/index.html';source=ASSETS[path]}
    if(source===undefined)return new Response('Not found',{status:404});
    const extension=path.split('.').pop();
    const body=typeof source==='string'?source:Uint8Array.from(atob(source.base64),c=>c.charCodeAt(0));
    return new Response(request.method==='HEAD'?null:body,{headers:{'Content-Type':TYPES[extension]||'text/plain; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}});
  }
};
