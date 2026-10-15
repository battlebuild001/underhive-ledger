import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';

const root=new URL('../',import.meta.url),context=vm.createContext({});
vm.runInContext(await readFile(new URL('dist/i18n-catalog-data.js',root),'utf8'),context);
const rules=JSON.parse(await readFile(new URL('dist/rules-data.json',root),'utf8'));
const normalize=text=>String(text).replace(/\s+/g,' ').trim();
for(const edition of ['n26','n23'])for(const language of ['ko','en']){
 const html=await readFile(new URL(`dist/guides/underhive-${edition}-${language}.html`,root),'utf8');
 const dom=new JSDOM(html),doc=dom.window.document,body=normalize(doc.body.textContent);
 assert.equal(doc.documentElement.lang,language);
 assert(body.length>3000,'Uploaded guides must include their full reading material.');
 assert.equal(doc.querySelectorAll('script,iframe,form,input,button').length,0,'Offline documents have no app actions or executable code.');
 assert.equal(doc.querySelectorAll('link[href^="http"],img[src^="http"]').length,0,'The reading document works without external assets.');
 const ids=[...doc.querySelectorAll('[id]')].map(node=>node.id);assert.equal(new Set(ids).size,ids.length,'Exported anchors are unique.');
 for(const anchor of doc.querySelectorAll('a[href^="#"]'))assert(doc.getElementById(anchor.getAttribute('href').slice(1)),'Every contents link opens a section.');
 assert(!/sediment:\/\/|\/workspace\/|underhive-ledger-v1|battletablehobby|\.docx\b/i.test(html),'Published summaries contain no uploaded-document or account-storage traces.');
 if(language==='en')assert(!/[가-힣]/.test(body),'The English reading document has no untranslated Korean.');
 if(edition==='n26'&&language==='en')for(const rule of rules.coreRules){
  assert(body.includes(normalize(context.UK_CATALOG_LOCALE.rulesEn['coreRules:'+rule.id])),'Every core rule must be present in the uploaded full guide: '+rule.id);
 }
 if(edition==='n23')assert(/N26/.test(body),'N23 documents explain their separate core-rule coverage.');
 assert(doc.querySelector('#quick-sheets'));assert(doc.querySelector('#glossary'));
 dom.window.close();
}
console.log('Published learning guides: four offline documents, all 105 N26 rule descriptions, internal contents links, edition coverage, English text and private-data isolation passed.');
