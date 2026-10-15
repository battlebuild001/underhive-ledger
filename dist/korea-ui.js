/* Underhive Korea presentation layer. Existing records and action handlers stay canonical. */
(function(){
  'use strict';
  const icons={
    roster:'<path d="M4 5h16v14H4zM8 5v14M12 9h5M12 13h5M12 16h3"/>',
    campaign:'<path d="M5 21V4m0 0c5-5 9 5 15 0v11c-6 5-10-5-15 0"/>',
    assets:'<path d="m12 3 8 5v9l-8 5-8-5V8zm-8 5 8 5 8-5m-8 5v9"/>',
    account:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    fighter:'<path d="m6 3 5 8-7 10m14-18-5 8 7 10M4 3l4 2M20 3l-4 2M3 17l5 4m13-4-5 4"/>',
    credits:'<circle cx="12" cy="12" r="9"/><path d="M15 8h-3a4 4 0 0 0 0 8h3M8 11h7M8 14h7"/>'
  };
  const svg=key=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]||icons.roster}</svg>`;
  function text(en,ko,cls=''){const node=document.createElement('span');if(cls)node.className=cls;node.textContent=en;node.dataset.i18nKo=ko;return node;}
  function workspaceSection(){if(data.view==='account'||data.view==='profile')return 'account';if(data.view==='catalog')return 'assets';if(data.view==='campaign'||data.view==='campaigns'||data.view==='dashboard'&&data.homeTab==='campaigns')return 'campaigns';return 'gangs';}
  function mountNavigation(main){
    const selected=workspaceSection();
    const nav=document.createElement('nav');nav.className='uk-workspace-nav';nav.setAttribute('aria-label','Workspace navigation');nav.dataset.i18nKoAriaLabel='작업 공간 메뉴';
    const inside=document.createElement('div');inside.className='uk-nav-inner';
    for(const [key,label,ko,icon] of [['gangs','Roster','갱 명단','roster'],['campaigns','Campaigns','캠페인','campaign'],['assets','Custom Assets','커스텀 에셋','assets'],['account','Account','계정','account']]){
      const button=document.createElement('button');button.type='button';button.className='uk-nav-item';button.dataset.ukSection=key;
      if(key==='account')button.dataset.accountAction='open';else button.dataset.ukNav=key;
      if(selected===key)button.setAttribute('aria-current','page');
      button.innerHTML=svg(icon);button.append(text(label,ko));inside.append(button);
    }
    nav.append(inside);main.querySelector('.topbar')?.insertAdjacentElement('afterend',nav);
  }
  function mountOverview(welcome){
    const currentEdition=data.edition||'N23',gangs=data.gangs.filter(g=>g.edition===currentEdition),campaigns=data.campaigns.filter(c=>c.edition===currentEdition),fighters=gangs.flatMap(g=>g.fighters||[]);
    const overview=document.createElement('section');overview.className='uk-overview';overview.setAttribute('aria-label','Workspace overview');overview.dataset.i18nKoAriaLabel='작업 공간 현황';
    for(const [en,ko,value,key] of [['Gangs','갱',gangs.length,'roster'],['Active fighters','활동 중인 파이터',fighters.filter(f=>f.status==='Active').length,'fighter'],['Campaigns','캠페인',campaigns.length,'campaign'],['Available credits','보유 크레딧',gangs.reduce((total,g)=>total+(Number(g.credits)||0),0),'credits']]){
      const item=document.createElement('div');item.className='uk-overview-stat';item.innerHTML=`<span class="uk-stat-icon">${svg(key)}</span><strong>${new Intl.NumberFormat('en-US').format(value)}</strong>`;item.append(text(en,ko,'uk-stat-label'));overview.append(item);
    }
    welcome.insertAdjacentElement('afterend',overview);
  }
  function enhanceWelcome(){
    const welcome=document.querySelector('.home-welcome');if(!welcome)return;
    welcome.classList.add('uk-command-hero');
    const title=welcome.querySelector('h1');if(title){title.textContent='Ready for the next battle.';title.dataset.i18nKo='다음 전투를 준비하세요';}
    let intro=welcome.querySelector('p');if(!intro){intro=document.createElement('p');title?.insertAdjacentElement('afterend',intro);}
    intro.textContent='Your gangs, fighters and campaigns. All in one workspace.';intro.dataset.i18nKo='갱 명단부터 캠페인 기록까지, 한곳에서 관리하세요.';
    const eyebrow=document.createElement('div');eyebrow.className='uk-hero-eyebrow';eyebrow.append(text('COMMAND DECK','작전 현황'));welcome.prepend(eyebrow);
    if(data.view!=='catalog')mountOverview(welcome);
  }
  function enhanceCards(){
    document.querySelectorAll('.home-list-card:not(.uk-portrait-card)').forEach(card=>{
      const button=card.querySelector('.home-card-main');if(!button)return;
      if(button.dataset.openGang){
        const g=data.gangs.find(g=>g.id===button.dataset.openGang),src=g&&window.MMGangPortrait?.imageFor(g);
        if(src){const image=document.createElement('img');image.className='uk-home-portrait';image.src=src;image.alt='';image.loading='lazy';image.decoding='async';button.prepend(image);card.classList.add('uk-portrait-card');}
      }else if(button.dataset.openCampaign){const mark=document.createElement('span');mark.className='uk-home-portrait uk-campaign-mark';mark.innerHTML=svg('campaign');button.prepend(mark);card.classList.add('uk-portrait-card');}
    });
  }
  function refresh(){
    const main=document.querySelector('#app .main');if(!main)return;
    document.documentElement.classList.add('uk-ui');document.body.dataset.ukView=data.view;
    if(!main.querySelector('.uk-workspace-nav'))mountNavigation(main);
    const welcome=main.querySelector('.home-welcome');if(welcome&&!welcome.classList.contains('uk-command-hero'))enhanceWelcome();
    document.querySelectorAll('.home-list-card:not(.uk-portrait-card)').length&&enhanceCards();
    document.querySelector('.content')?.setAttribute('id','uk-main-content');
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-uk-nav]');if(!button)return;
    event.preventDefault();event.stopImmediatePropagation();
    const section=button.dataset.ukNav;
    if(section==='assets')data.view='catalog';else{data.view='dashboard';data.homeTab=section==='campaigns'?'campaigns':'gangs';}
    menuOpen=false;save();
  },true);
  const previousRender=render;render=function(...args){const result=previousRender.apply(this,args);refresh();return result;};
  window.UKInterface={refresh};refresh();
})();
