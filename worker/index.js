import {handleApi} from './account-api.js';

// The build replaces this marker with the checked-in static app assets.
const ASSETS = __MUNDA_ASSETS__;
const TYPES = {html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8',json:'application/json; charset=utf-8',webmanifest:'application/manifest+json; charset=utf-8',svg:'image/svg+xml'};

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(url.pathname.startsWith('/api/'))return handleApi(request,env,ctx);
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    let path;
    try{path=decodeURIComponent(url.pathname)}catch{return new Response('Bad request',{status:400})}
    if(path==='/')path='/index.html';
    let source=ASSETS[path];
    if(source===undefined&&/^\/(gang|fighter|campaigns|account)(\/|$)/.test(path)){path='/index.html';source=ASSETS[path]}
    if(source===undefined)return new Response('Not found',{status:404});
    const extension=path.split('.').pop();
    return new Response(request.method==='HEAD'?null:source,{headers:{'Content-Type':TYPES[extension]||'text/plain; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'}});
  }
};
