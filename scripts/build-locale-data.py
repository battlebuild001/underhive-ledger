from pathlib import Path
import json,re

root=Path(__file__).resolve().parents[1]
data=json.loads((root/'dist/rules-data.json').read_text())
directory=root/'data/localization'
glossary=json.loads((directory/'proper-name-glossary.json').read_text())
pronunciations=json.loads((directory/'phonemes.json').read_text())
english=json.loads((directory/'rules-en.json').read_text())
conditions=json.loads((directory/'conditions-en.json').read_text())
words={k.lower():v for k,v in glossary['words'].items()}
phrases=glossary['phrases']
vowels={'AA':'아','AE':'애','AH':'어','AO':'오','AW':'아우','AY':'아이','EH':'에','ER':'어','EY':'에이','IH':'이','IY':'이','OW':'오','OY':'오이','UH':'우','UW':'우'}
onsets={'B':7,'CH':14,'D':3,'DH':3,'F':17,'G':0,'HH':18,'JH':12,'K':15,'L':5,'M':6,'N':2,'NG':11,'P':17,'R':5,'S':9,'SH':9,'T':16,'TH':9,'V':7,'Z':12,'ZH':12}
finals={'L':8,'M':16,'N':4,'NG':21,'K':1,'G':1,'T':19,'D':19,'P':17,'B':17}
default_cons={'B':'브','CH':'치','D':'드','DH':'드','F':'프','G':'그','HH':'흐','JH':'지','K':'크','L':'르','M':'므','N':'느','NG':'응','P':'프','R':'르','S':'스','SH':'시','T':'트','TH':'스','V':'브','W':'우','Y':'이','Z':'즈','ZH':'지'}
letter_names={'a':'에이','b':'비','c':'시','d':'디','e':'이','f':'에프','g':'지','h':'에이치','i':'아이','j':'제이','k':'케이','l':'엘','m':'엠','n':'엔','o':'오','p':'피','q':'큐','r':'알','s':'에스','t':'티','u':'유','v':'브이','w':'더블유','x':'엑스','y':'와이','z':'제트'}
def attach_final(out,phone):
    if not out or phone not in finals:return False
    code=ord(out[-1][-1])-0xac00
    if not 0<=code<11172 or code%28:return False
    out[-1]=out[-1][:-1]+chr(0xac00+code+finals[phone]);return True
def syllable(onset,vowel):
    return chr(ord(vowel[0])+(onset-11)*21*28)+vowel[1:]
def phonetic(phones):
    raw=[re.sub(r'\d','',p) for p in phones];out=[];i=0;last_vowel=''
    while i<len(raw):
        p=raw[i];n=raw[i+1] if i+1<len(raw) else ''
        if p in vowels:out.append(vowels[p]);last_vowel=p;i+=1;continue
        if p in ['W','Y'] and n in vowels:
            table={'W':{'AA':'와','AE':'왜','AH':'워','AO':'워','EH':'웨','ER':'워','EY':'웨이','IH':'위','IY':'위','OW':'워','UH':'우','UW':'우','AY':'와이'},'Y':{'AA':'야','AE':'얘','AH':'여','AO':'요','EH':'예','ER':'여','EY':'예이','IH':'이','IY':'이','OW':'요','UH':'유','UW':'유'}}
            out.append(table[p].get(n,vowels[n]));last_vowel=n;i+=2;continue
        if p=='R' and (not n or n not in vowels) and out:i+=1;continue
        if n in vowels and p in onsets:
            if p=='L' and out:attach_final(out,'L')
            vowel=vowels[n]
            if p in ['SH','ZH']:
                vowel={'AA':'야','AE':'얘','AH':'여','AO':'요','AW':'야우','AY':'야이','EH':'예','ER':'여','EY':'예이','IH':'이','IY':'이','OW':'요','OY':'요이','UH':'유','UW':'유'}[n]
            out.append(syllable(onsets[p],vowel));last_vowel=n;i+=2;continue
        if p in ['L','M','N','NG'] and attach_final(out,p):i+=1;continue
        if p in ['K','G','T','D','P','B'] and last_vowel in ['AE','EH','IH','AH','AA'] and attach_final(out,p):last_vowel='';i+=1;continue
        out.append(default_cons.get(p,'으'));last_vowel='';i+=1
    return ''.join(out)

fallback_words=set()
def fallback(word):
    # Deterministic grapheme pronunciation is used only for uncatalogued loanwords.
    s=word.lower().replace('ph','f').replace('ck','k').replace('qu','kw')
    pieces=[];i=0
    pairs={'sh':'SH','ch':'CH','th':'TH','ng':'NG','ee':'IY','ea':'IY','oo':'UW','ou':'AW','ow':'OW','ai':'EY','ay':'EY','oi':'OY','oy':'OY','au':'AO'}
    cons={'b':'B','c':'K','d':'D','f':'F','g':'G','h':'HH','j':'JH','k':'K','l':'L','m':'M','n':'N','p':'P','q':'K','r':'R','s':'S','t':'T','v':'V','w':'W','x':'K','y':'Y','z':'Z'}
    vs={'a':'AE','e':'EH','i':'IH','o':'AA','u':'AH'}
    while i<len(s):
        pair=s[i:i+2]
        if pair in pairs:pieces.append(pairs[pair]);i+=2;continue
        c=s[i]
        if c=='e' and i==len(s)-1 and pieces and len(s)>3:i+=1;continue
        pieces.append(vs.get(c,cons.get(c,'AH')));i+=1
    return phonetic(pieces)
def word_ko(word):
    lower=word.lower()
    if lower in words:return words[lower]
    if lower.endswith("'s"):return word_ko(word[:-2])
    if lower in pronunciations:return phonetic(pronunciations[lower])
    if len(lower)==1:return letter_names[lower]
    if lower.endswith('s') and lower[:-1] in words:return words[lower[:-1]]+'스'
    fallback_words.add(lower);return fallback(lower)
def name_ko(name):
    if name in phrases:return phrases[name]
    def replace(m):
        token=m.group()
        if token in ['N','D','WS','BS','AP','XP','TP','Ld','Cl','Wil','Int','S','T','W','I','A','E','C','X']:return token
        return word_ko(token)
    return re.sub(r"[A-Za-z]+(?:['’][sS])?",replace,name)

name_fields=['name','fighter_type','equipment_name','effect_name','profile_name','gang_type','category_name','subtype_name','origin_name','scenario_name','triumph','campaign_type_name','specialisation_name','trading_post_name']
names=set();aliases={};desc_en={};desc_ko={};rule_en={}
proper_collections={'gangTypes','affiliations','gangOrigins','fighterTypes','fighterSubtypes','fighterSpecialisations','equipment','weaponProfiles','skills','skillTypes','effects','scenarios','scenarioEntries','territories','tactics','tacticsPacks','campaignTypes','campaignTriumphs','alliances','vehicleTypes','gangLegacies','gangLineages','weaponTraits','chemRecipes','archetypes'}
lookup={(r['collection'],r['id']):r['description_en'] for r in english}
for collection,rows in data.items():
    if not isinstance(rows,list):continue
    for row in rows:
        if not isinstance(row,dict):continue
        for field in name_fields:
            if isinstance(row.get(field),str) and re.search('[A-Za-z]',row[field]):names.add(row[field])
        ident=row.get('id');original=row.get('description')
        if original and (collection,ident) in lookup:
            translated=lookup[(collection,ident)];rule_en[collection+':'+ident]=translated;desc_en[original]=translated;desc_ko[translated]=original
        if collection in proper_collections and row.get('name_ko') and row.get('name'):
            aliases[row['name_ko']]=name_ko(row['name'])
mapping={name:name_ko(name) for name in sorted(names)}
desc_en.update(conditions)
desc_ko.update({translated:original for original,translated in conditions.items()})
payload={'names':mapping,'words':words,'phrases':phrases,'koAliases':aliases,'descriptionsEn':desc_en,'descriptionsKo':desc_ko,'rulesEn':rule_en,'coverage':{'catalogNames':len(mapping),'englishRuleDescriptions':len(rule_en),'englishConditions':len(conditions)}}
(root/'dist/i18n-catalog-data.js').write_text('/* Offline catalog display names and English rule summaries. */\nglobalThis.UK_CATALOG_LOCALE = '+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
(directory/'fallback-words.json').write_text(json.dumps(sorted(fallback_words),ensure_ascii=False,indent=2)+'\n')
print('Built',len(mapping),'phonetic names and',len(rule_en),'English descriptions; pronunciation fallback words:',len(fallback_words))
