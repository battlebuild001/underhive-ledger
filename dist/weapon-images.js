/* Read-only, exact equipment-to-image references. Images are not rules or purchase options. */
(function(){'use strict';
const E=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),L=(en,ko)=>`<span data-i18n-en="${E(en)}" data-i18n-ko="${E(ko)}">${E(en)}</span>`,ed=value=>String(value||'').toLowerCase(),store=()=>window.MM_WEAPON_IMAGES||{};
function baseFor(item,edition){
 if(!item||ed(edition||window.MMRuleReference?.currentEdition())!=='n26'||item.is_custom||item.customAssetId||item.reference_custom_name||item.reference_description_cleared||item.profile_scope_unresolved||item.edition_slug&&ed(item.edition_slug)!=='n26'||item.edition&&ed(item.edition)!=='n26')return null;
 const all=window.RULES_DATA?.equipment||[],ids=[item.catalogId,item.presetId,item.id].filter(Boolean);let base=null;
 for(const id of ids){const row=all.find(row=>row.id===id);if(row){base=row;break;}if(id===item.catalogId||id===item.presetId)return null;}
 // A bare name is deliberately insufficient: custom entries and ammo must never borrow an image.
 if(!base||!base.source_verified||ed(base.edition_slug||base.edition)!=='n26'||base.profile_scope_unresolved||base.is_custom)return null;
 if(item.name&&![base.name,base.name_ko].includes(item.name))return null;
 return base;
}
function resolve(item,options={}){
 const base=baseFor(item,options.edition);if(!base)return null;
 const entry=store().equipment?.[base.id];if(!entry||entry.name!==base.name)return null;
 const asset=store().assets?.[entry.asset];if(!asset||!/^\/weapon-images\/[a-z0-9-]+\.(?:png|jpg|webp)$/.test(asset.src))return null;
 return {base,entry,asset};
}
function markup(item,options={}){
 const found=resolve(item,options);
 if(!found){const base=baseFor(item,options.edition);return base&&(base.weapon_profiles||[]).length?`<p class="weapon-image-missing">${L('No identified visual reference yet.','확인된 무장 외형 자료가 아직 없습니다.')}</p>`:'';}
 const {base,asset}=found,label=base.name,ko=base.name_ko||label,alt=label+' — '+(asset.type==='photo'?'miniature / weapon photo':'weapon illustration');
 return `<figure class="weapon-image" data-weapon-image="${E(base.id)}"><div class="weapon-image-stage"><img src="${E(asset.src)}" width="${E(asset.width)}" height="${E(asset.height)}" alt="${E(alt)}" data-i18n-en-alt="${E(alt)}" data-i18n-ko-alt="${E(ko+' — '+(asset.type==='photo'?'무장·모델 사진':'무장 일러스트'))}" loading="lazy" decoding="async"><p class="weapon-image-error" role="status" hidden>${L('The image could not be loaded. You can still open the source below.','이미지를 불러오지 못했습니다. 아래 출처에서 확인할 수 있습니다.')}</p></div><figcaption><div class="weapon-image-tools"><span class="weapon-image-type">${asset.type==='photo'?L('Photo · visual example','사진 · 외형 예시'):L('Illustration · visual example','일러스트 · 외형 예시')}</span><button type="button" data-weapon-image-expand aria-expanded="false">${L('Enlarge','크게 보기')}</button></div><details class="weapon-image-source"><summary>${L('Source & image notes','출처·이미지 참고')}</summary><p><a href="${E(asset.sourceUrl)}" target="_blank" rel="noopener noreferrer">${E(asset.sourceLabel)} ↗</a> · <a href="${E(asset.originalUrl)}" target="_blank" rel="noopener noreferrer">${L('Original image','원본 이미지')} ↗</a></p><p data-i18n-ignore>${E(asset.credit)}</p><p>${L('A visual identification example. House patterns and conversions can look different. Art from earlier releases does not change the N26 profiles shown here.','외형을 알아보기 위한 예시입니다. 하우스별 디자인·개조에 따라 모습이 다를 수 있습니다. 이전 제품·삽화의 외형 자료이며, 현재 표시된 N26 스펙을 바꾸지 않습니다.')}</p>${asset.noteEn?`<p>${L(asset.noteEn,asset.noteKo)}</p>`:''}${asset.label==='Stiletto sword and knife'?`<p>${L('Both the sword and knife are shown in this official photo.','이 공식 사진에는 스틸레토 검과 나이프가 함께 나옵니다.')}</p>`:''}</details></figcaption></figure>`;
}
function pickerButton(item,options={}){
 const found=resolve(item,options);if(!found)return '';
 return `<button type="button" class="btn small fp-weapon-photo" data-weapon-image-open="${E(found.base.id)}" aria-haspopup="dialog" aria-label="${E(found.base.name+' — View image')}" data-i18n-en-aria-label="${E(found.base.name+' — View image')}" data-i18n-ko-aria-label="${E((found.base.name_ko||found.base.name)+' 사진 보기')}">${L('Photo','사진')}</button>`;
}
window.addEventListener('click',event=>{const trigger=event.target.closest?.('[data-weapon-image-open]');if(!trigger)return;event.preventDefault();event.stopImmediatePropagation();const item=(window.RULES_DATA?.equipment||[]).find(row=>row.id===trigger.dataset.weaponImageOpen);if(resolve(item,{edition:'n26'}))window.MMRuleReference?.open('equipment',item,{edition:'n26',activator:trigger,nested:!!document.querySelector('.mmrr-overlay')});},true);
window.addEventListener('click',event=>{const button=event.target.closest?.('[data-weapon-image-expand]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();const figure=button.closest('[data-weapon-image]');if(!figure)return;const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));figure.classList.toggle('is-expanded',expanded);button.innerHTML=expanded?L('Reduce','작게 보기'):L('Enlarge','크게 보기');window.UKI18n?.refresh(button);},true);
document.addEventListener('error',event=>{const img=event.target;if(img?.tagName!=='IMG'||!img.closest('[data-weapon-image]'))return;img.hidden=true;const stage=img.closest('.weapon-image-stage');stage.querySelector('.weapon-image-error').hidden=false;const button=stage.closest('figure').querySelector('[data-weapon-image-expand]');button.hidden=true;},true);
window.MMWeaponImages={resolve,markup,pickerButton};
})();
