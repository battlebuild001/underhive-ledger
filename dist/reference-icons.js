/* Reference presentation only: controls keep their original identity and handlers. */
(function(){
  'use strict';
  const paths={
    trash:'<path d="M3 6h18M19 6v14H5V6M9 6V3h6v3M10 10v6M14 10v6"/>',
    archive:'<rect x="3" y="3" width="18" height="4" rx="1"/><path d="M5 7v14h14V7M10 11h4"/>',
    dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    chevrons:'<path d="m8 9 4-4 4 4m-8 6 4 4 4-4"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    moon:'<path d="M20.9 13A9 9 0 0 1 11 3.1a9 9 0 1 0 9.9 9.9Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    settings:'<path d="m9 3-.5 2-2 1.2-2-.6-2 3.5L4 10.5v3l-1.5 1.4 2 3.5 2-.6 2 1.2.5 2h6l.5-2 2-1.2 2 .6 2-3.5-1.5-1.4v-3l1.5-1.4-2-3.5-2 .6-2-1.2L15 3Z"/><circle cx="12" cy="12" r="3"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
    ooa:'<path d="M4 3h16v18H4zM4 18h16"/><path d="M8 9a4 4 0 1 1 8 0c0 1.4-.7 2.6-2 3v2h-4v-2c-1.3-.4-2-1.6-2-3Z"/><path d="M10 9h.01M14 9h.01"/>'
  };
  const korean=()=>window.UKI18n?.language!=='en';
  const icon=(key,size=16)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-mm-reference-svg>${paths[key]}</svg>`;
  function putIcon(node,key,size=16){
    if(node.dataset.mmReferenceIcon===key&&node.querySelector(':scope > svg[data-mm-reference-svg]'))return;
    node.innerHTML=icon(key,size);node.dataset.mmReferenceIcon=key;
  }
  function accessibleName(node,en,ko){
    const current=korean()?ko:en;
    if(node.getAttribute('data-i18n-ko-aria-label')!==ko)node.setAttribute('data-i18n-ko-aria-label',ko);
    if(node.getAttribute('data-i18n-ko-title')!==ko)node.setAttribute('data-i18n-ko-title',ko);
    if(node.getAttribute('aria-label')!==current)node.setAttribute('aria-label',current);
    if(node.title!==current)node.title=current;
  }
  function action(node,key,en,ko,className){
    putIcon(node,key);node.classList.add('mm-reference-icon-button',className);accessibleName(node,en,ko);
  }
  let queued=false,refreshing=false;
  function refresh(){
    if(refreshing)return;refreshing=true;
    try{
      const light=document.documentElement.classList.contains('light'),emblem=document.querySelector('.top-emblem'),source='/reference-ui/icon-'+(light?'black':'white')+'.png';
      if(emblem){
        let image=emblem.querySelector(':scope > img[data-mm-reference-brand]');
        if(!image){image=document.createElement('img');image.dataset.mmReferenceBrand='';image.width=36;image.height=36;image.alt='';emblem.replaceChildren(image);}
        if(image.getAttribute('src')!==source)image.setAttribute('src',source);
      }
      document.querySelectorAll('button[data-ext="remove-skill"]').forEach(button=>action(button,'trash','Delete skill','스킬 삭제','mm-reference-skill-delete'));
      document.querySelectorAll('button[data-to-stash]').forEach(button=>action(button,'archive','Move to stash','보관고로 이동','mm-reference-stash'));
      document.querySelectorAll('button[data-deep="sell-equipment"]').forEach(button=>action(button,'dollar','Sell equipment','장비 판매','mm-reference-sell'));
      document.querySelectorAll('.mm-combo-chevron').forEach(node=>putIcon(node,'chevrons'));
      document.querySelectorAll('[data-action="menu"]').forEach(node=>putIcon(node,'menu',20));
      document.querySelectorAll('[data-theme-toggle]').forEach(node=>putIcon(node,light?'sun':'moon',20));
      document.querySelectorAll('[data-cp="campaign-image"]:not(:has(img))').forEach(node=>putIcon(node,'settings',20));
      document.querySelectorAll('.favorite').forEach(node=>{putIcon(node,'star',20);const fill=node.classList.contains('on')?'currentColor':'none',svg=node.querySelector('svg');if(svg&&svg.getAttribute('fill')!==fill)svg.setAttribute('fill',fill);});
      document.querySelectorAll('.fp-ooa').forEach(node=>{if(node.querySelector('[data-mm-reference-svg]'))return;const label=document.createElement('span');label.textContent=node.textContent.replace('☠','').trim();putIcon(node,'ooa',18);node.append(label);});
      document.querySelectorAll('[data-gc="fighter-logs"]').forEach(node=>{action(node,'list','View Fighter Logs','파이터 활동 기록','mm-reference-history');const actions=node.closest('.fighter-page-actions'),xp=actions?.querySelector('[data-play="add-xp"]'),anchor=xp?.closest('.uk-help-action-pair')||xp;if(anchor&&node.nextElementSibling!==anchor)anchor.before(node);});
      document.querySelectorAll('.crumb > span:first-child').forEach(node=>{if(!node.matches('[data-user-text]'))putIcon(node,'home',20);});
      if(typeof data!=='undefined'&&data.view==='fighter'){
        const crumb=document.querySelector('.crumb'),g=typeof gang==='function'?gang():null;
        if(crumb&&g&&!crumb.querySelector('[data-mm-reference-back]')){
          const label=[...crumb.childNodes].find(node=>node.nodeType===3&&node.textContent.trim()==='/ '+g.name+' /');
          if(label){const back=document.createElement('button');back.type='button';back.dataset.parity='back-gang';back.dataset.mmReferenceBack='';back.dataset.userText='';back.textContent=g.name;label.replaceWith(document.createTextNode(' / '),back,document.createTextNode(' / '));}
        }
        if(crumb?.querySelector('[data-mm-reference-back]'))document.querySelector('.fighter-picker > [data-parity="back-gang"]')?.setAttribute('data-mm-reference-back-moved','');
      }
      document.querySelectorAll('.mm-menu-icon > svg,.tab-icon > svg,.entity-tools > button > svg').forEach(node=>{
        for(const [name,value]of [['width','20'],['height','20'],['stroke-width','2']])if(node.getAttribute(name)!==value)node.setAttribute(name,value);
      });
    }finally{refreshing=false;}
  }
  function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;refresh();});}
  const before=render;render=function(...args){const result=before.apply(this,args);refresh();return result;};
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  window.addEventListener('uk:languagechange',schedule);
  window.MMReferenceIcons={refresh};refresh();
})();
