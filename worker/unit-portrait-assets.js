/* Manifest-bound generated portraits live in R2 instead of the Worker bundle. */
const unitPortraitPrefix='/portraits/units/';
const unitPortraitJson=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const unitPortraitKey=entry=>'system/unit-portraits/v1/'+entry.sha256+'.webp';
export async function handleUnitPortraitAssets(request,env,manifest){
 const url=new URL(request.url);
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
