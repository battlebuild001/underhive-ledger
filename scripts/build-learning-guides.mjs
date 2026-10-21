import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {JSDOM} from 'jsdom';

// Export only public learning content in an isolated window with no user records.
const dist=new URL('../dist/',import.meta.url);
const dom=new JSDOM('<!doctype html><html><head><title>Guide export</title></head><body><div id="app"></div></body></html>',{url:'https://guide-export.test/',runScripts:'outside-only'});
const w=dom.window;
w.eval('var data={gangs:[],campaigns:[],view:"dashboard"}; var render=function(){};');
try{
 for(const file of ['rules-data.js','i18n-ui-data.js','i18n-catalog-data.js','korea-i18n.js','learning-content.js','learning-tutorials.js','tutorial-detail-foundations.js','tutorial-detail-n26.js','learning-center.js'])w.eval(await readFile(new URL(file,dist),'utf8'));
 if(typeof w.UKLearning?.buildGuideHTML!=='function')throw Error('Learning guide export is unavailable.');
 await mkdir(new URL('guides/',dist),{recursive:true});
 for(const edition of ['n26','n23'])for(const language of ['ko','en']){
  w.UKI18n.setLanguage(language);
  const html=w.UKLearning.buildGuideHTML(edition,language);
  if(typeof html!=='string'||!/^<!doctype html>/i.test(html)||/<script\b/i.test(html))throw Error('The guide must be a standalone document without scripts.');
  const file=new URL(`guides/underhive-${edition}-${language}.html`,dist);
  await writeFile(file,html);
  console.log(`Published learning document ${fileURLToPath(file).split('/').at(-1)} (${Math.round(Buffer.byteLength(html)/1024)} KB).`);
 }
}finally{w.close();}
