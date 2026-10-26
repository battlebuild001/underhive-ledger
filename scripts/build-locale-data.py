from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'dist/rules-data.json').read_text())
if data.get('official_source_policy')!='provided_official_originals_only':raise SystemExit('Supplied-original policy required')
payload={'names':{},'words':{},'phrases':{},'koAliases':{},'descriptionsEn':{},'descriptionsKo':{},'rulesEn':{}}
english=[]
for kind,rows in data.items():
 if not isinstance(rows,list):continue
 for row in rows:
  if not row.get('source_verified') or not row.get('verified_fields'):raise SystemExit('Unreviewed locale source')
  name=row.get('name','');name_ko=row.get('name_ko','');ko=row.get('description','');en=row.get('description_en','')
  if name and name_ko:payload['names'][name]=name_ko;payload['koAliases'][name_ko]=name
  if ko and en:
   payload['descriptionsEn'][ko]=en;payload['descriptionsKo'][en]=ko;payload['rulesEn'][kind+':'+row['id']]=en
   english.append({'key':kind+':'+row['id'],'text':en})
payload['coverage']={'catalogNames':len(payload['names']),'englishRuleDescriptions':len(payload['rulesEn']),'englishConditions':0}
payload['official_source_status']=data.get('official_source_status','awaiting_original')
(root/'dist/i18n-catalog-data.js').write_text('/* Fresh translations of reviewed supplied-original entries. */\nglobalThis.UK_CATALOG_LOCALE = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
(root/'data/localization/rules-en.json').write_text(json.dumps(english,ensure_ascii=False,indent=2)+'\n')
(root/'data/localization/conditions-en.json').write_text('{}\n')
print('Generated',len(payload['names']),'names and',len(payload['rulesEn']),'bilingual explanations from reviewed entries only.')
