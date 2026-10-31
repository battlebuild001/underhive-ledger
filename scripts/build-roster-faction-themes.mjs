import fs from 'node:fs';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),config=JSON.parse(read('data/faction-card-themes.json')),catalog=JSON.parse(read('dist/rules-data.json'));
assert.equal(config.profiles.length,catalog.gangTypes.length);assert.equal(new Set(config.profiles.map(p=>p.id)).size,17);
const allowed=new Set(['id','name','slug','accent','header','paper','texture','seal','edge','glyph']);
for(const p of config.profiles){assert(Object.keys(p).every(key=>allowed.has(key)),'Visual metadata only');assert(catalog.gangTypes.some(row=>row.id===p.id&&row.name===p.name&&row.source_verified));for(const key of ['accent','header','paper'])assert(/^#[a-f0-9]{6}$/i.test(p[key]));assert(/^[a-z-]+$/.test(p.slug));assert(!/["<>]|url\(/i.test(p.texture+p.seal+p.edge.join('')));assert(!/<\/?(?:script|foreignObject)|\bon\w+=|href=/i.test(p.glyph));}
const runtime=`/* Presentation only. Original roster data, DOM controls and calculations supply all content. */
(function(){'use strict';
const profiles=${JSON.stringify(config.profiles)},byId=new Map(profiles.map(p=>[p.id,p])),byName=new Map(profiles.map(p=>[p.name,p]));
function profile(g){if(!g||g.customGangTypeId||g.custom_gang_type_id||g.isCustomGang||g.isCustomGangType)return null;const type=window.MMVerifiedRules?.gangType(g)||window.MMGang?.findGangType(g);if(type)return type.is_custom?null:byId.get(type.id)||null;if(g.customGangTypeId||g.custom_gang_type_id||g.isCustomGang||g.isCustomGangType)return null;return String(g.edition).toUpperCase()==='N23'?byName.get(g.faction)||null:null;}
function attributes(g){const p=profile(g);if(!p)return '';const e=p.edge;return ' data-roster-faction="'+p.slug+'" data-roster-faction-id="'+p.id+'" style="--rf-accent:'+p.accent+';--rf-header:'+p.header+';--rf-paper:'+p.paper+';--rf-texture:'+p.texture+';--rf-seal:'+p.seal+';--rf-edge:'+e[0]+';--rf-edge-clip:'+e[1]+';--rf-edge-width:'+e[2]+';--rf-edge-height:'+e[3]+'"';}
function mark(g){const p=profile(g);return p?'<svg class="rf-mark" width="64" height="64" style="pointer-events:none;position:absolute" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true" focusable="false" data-i18n-ignore>'+p.glyph+'</svg>':'';}
function corners(g){return profile(g)?['tl','tr','bl','br'].map(pos=>'<i class="rf-corner rf-'+pos+'" aria-hidden="true"></i>').join(''):'';}
function stats(g,content){return profile(g)?'<div class="rf-stat-scroll" tabindex="0" role="region" aria-label="Fighter characteristics" data-i18n-en-aria-label="Fighter characteristics" data-i18n-ko-aria-label="파이터 능력치">'+content+'</div>':content;}
window.MMRosterThemes={profile,attributes,mark,corners,stats,entries:profiles.map(({id,name,slug})=>({id,name,slug}))};
})();
`;
fs.writeFileSync(new URL('../dist/roster-faction-themes.js',import.meta.url),runtime);console.log('Built '+config.profiles.length+' faction visual profiles.');
