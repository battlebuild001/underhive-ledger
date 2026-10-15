import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('dist/rules-data.json', root), 'utf8'));
const context = vm.createContext({});
context.window = context;
for (const file of ['learning-content.js', 'learning-tutorials.js']) {
  vm.runInContext(await readFile(new URL('dist/' + file, root), 'utf8'), context, {filename: file});
}
const content = context.UK_LEARNING_CONTENT;
assert(content?.chapters?.length, 'The learning handbook must contain chapters.');
assert(Array.isArray(context.UK_TUTORIALS) && context.UK_TUTORIALS.length,
  'The companion tutorial curriculum must be available alongside the handbook.');

function edition(row) {
  const direct = row.edition_slug || row.edition || catalog.editions.find(item => item.id === row.edition_id)?.slug;
  if (direct) return direct;
  for (const [key, collection] of [['equipment_id', 'equipment'], ['fighter_type_id', 'fighterTypes'], ['scenario_table_id', 'scenarioTables'], ['campaign_type_id', 'campaignTypes']]) {
    if (row[key]) {
      const parent = catalog[collection].find(item => item.id === row[key]);
      if (parent) return edition(parent);
    }
  }
}

let referenceCount = 0;
function checkReference(ref, expectedEdition, label) {
  assert(Array.isArray(catalog[ref.kind]), label + ' must identify a catalog collection.');
  const row = catalog[ref.kind].find(item => item.id === ref.id);
  assert(row, label + ' must identify an existing catalog entry.');
  assert.equal(ref.edition, expectedEdition, label + ' must retain the learning item edition.');
  assert.equal(edition(row), expectedEdition, label + ' must not cross catalog editions.');
  referenceCount++;
  return row;
}

function localized(text, label) {
  assert.equal(typeof text?.ko, 'string', label + ' needs Korean text.');
  assert.equal(typeof text?.en, 'string', label + ' needs English text.');
  assert(text.ko.trim() && text.en.trim(), label + ' cannot have an empty translation.');
  assert(!/[가-힣]/u.test(text.en), label + ' English must not contain untranslated Korean text.');
}

function needsReview(row) {
  return Object.entries(row.rule_data || {}).some(([key, value]) =>
    key === 'review_notes' && value?.length ||
    /review_required|unverified/.test(key) && value === true ||
    /verified/.test(key) && value === false ||
    /status$/.test(key) && typeof value === 'string' && /unresolved|conflicting|requires/.test(value));
}

const chapterIds = new Set(), topicIds = new Set(), coveredCore = new Set();
const unresolvedReferences = new Set(), reviewedReferences = new Set();
for (const chapter of content.chapters) {
  assert(['n23', 'n26'].includes(chapter.edition));
  assert(!chapterIds.has(chapter.id), 'Chapter IDs must be unique.');
  chapterIds.add(chapter.id);
  localized(chapter.title, chapter.id + ' title');
  localized(chapter.intro, chapter.id + ' introduction');
  assert(chapter.topics.length, chapter.id + ' needs reading topics.');
  for (const topic of chapter.topics) {
    assert(!topicIds.has(topic.id), 'Topic IDs must be unique.');
    topicIds.add(topic.id);
    localized(topic.title, topic.id + ' title');
    localized(topic.summary, topic.id + ' summary');
    assert(topic.steps?.length, topic.id + ' needs a practical reading procedure.');
    for (const step of topic.steps) localized(step, topic.id + ' step');
    for (const tip of topic.tips || []) localized(tip, topic.id + ' tip');
    if (topic.review) localized(topic.review, topic.id + ' review notice');
    assert(topic.references?.length, topic.id + ' needs a current catalog reference.');
    for (const ref of topic.references) {
      const row = checkReference(ref, chapter.edition, topic.id);
      if (needsReview(row)) {
        const key = ref.kind + ':' + ref.id;
        unresolvedReferences.add(key);
        if (topic.review) reviewedReferences.add(key);
      }
      if (ref.kind === 'coreRules') {
        coveredCore.add(row.id);
      }
    }
  }
}
for (const key of unresolvedReferences) {
  assert(reviewedReferences.has(key), key + ' needs an unresolved-detail notice in its handbook coverage.');
}
assert.equal(catalog.coreRules.filter(row => edition(row) === 'n23').length, 12,
  'N23 needs its own verified core summaries.');
assert.deepEqual([...coveredCore].sort(), catalog.coreRules.map(row => row.id).sort(),
  'Every available core rule must be reachable from the handbook.');
for (const version of ['n23', 'n26']) {
  localized(content.coverageNotice[version], version + ' coverage notice');
  const sheets = content.quickSheets[version], ids = new Set();
  assert(sheets.length, version + ' needs a separate quick sheet set.');
  for (const sheet of sheets) {
    assert(!ids.has(sheet.id), 'Quick sheet IDs must be unique within the edition.');
    ids.add(sheet.id);
    localized(sheet.title, sheet.id + ' title');
    assert(sheet.steps?.length, sheet.id + ' needs actionable steps.');
    for (const step of sheet.steps) localized(step, sheet.id + ' step');
    if (sheet.caution) localized(sheet.caution, sheet.id + ' caution');
    assert(sheet.references?.length, sheet.id + ' needs current catalog references.');
    for (const ref of sheet.references) checkReference(ref, version, sheet.id);
  }
}

const glossaryIds = new Set();
for (const item of content.glossary) {
  assert(!glossaryIds.has(item.id), 'Glossary IDs must be unique.');
  glossaryIds.add(item.id);
  localized(item.term, item.id + ' term');
  localized(item.definition, item.id + ' definition');
  assert(item.editions?.length, item.id + ' needs an edition scope.');
  for (const ref of item.refs || []) {
    assert(item.editions.includes(ref.edition), item.id + ' must reference an applicable edition.');
    checkReference(ref, ref.edition, item.id);
  }
}

// Reconcile the complete reference tables against catalog values. These checks
// catch missing bands, swapped rewards and injury ranges independently of the UI.
const core = id => catalog.coreRules.find(row => row.id === 'n26-core-' + id).rule_data;
const quick = id => content.quickSheets.n26.find(row => row.id === id);
const compact = value => value.replace(/[–−]/g, '-').replace(/\s/g, '');
const xpBands = core('xp-bands').bands;
assert.equal(quick('experience-bands').steps.length, xpBands.length,
  'The complete XP reference must include every distinct band.');
xpBands.forEach((band, index) => {
  const text = quick('experience-bands').steps[index].en;
  const expected = band.minimum_xp + (band.maximum_xp == null ? '+' : '-' + band.maximum_xp) + 'XP:';
  assert(compact(text).startsWith(expected), 'XP band limits must match the catalog.');
  assert(text.includes(band.rank), 'XP band ranks must match their limits.');
});
const advancement = core('advancement-table').table;
assert.equal(quick('advancement-results').steps.length, advancement.length);
advancement.forEach((row, index) => {
  const text = compact(quick('advancement-results').steps[index].en);
  assert(text.startsWith(row.roll + ':'), 'Advancement roll ranges must match their rows.');
  assert(text.includes('Value+' + row.rating_delta + 'credits.'),
    'Advancement value increases must match the corresponding catalog result.');
});
core('wound-target').table.forEach((row, index) => {
  assert(quick('wound-table').steps[index].en.includes('→ ' + row.target),
    'Each Strength/Toughness comparison must retain its catalog wound target.');
});
const lasting = quick('lasting-injury-results');
const injuries = lasting.references.map(ref => checkReference(ref, 'n26', lasting.id))
  .filter(row => row.rule_data?.model_type === 'Fighter' && row.rule_data?.d66);
assert.equal(lasting.steps.length, injuries.length, 'The complete Fighter injury reference must include all scoped results.');
injuries.forEach((row, index) => {
  assert(compact(lasting.steps[index].en).startsWith(compact(row.rule_data.d66) + ':'),
    'D66 injury ranges must remain attached to their catalog result.');
});

// The published educational bundle may contain rule IDs, but never attachment paths,
// account identifiers, document filenames or extraction locations.
const educationalText = JSON.stringify([content, context.UK_TUTORIALS]);
assert(!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(educationalText), 'Learning material must not contain account email addresses.');
assert(!/sediment:\/\/|file_[a-f\d]{20,}|\/workspace\/attachments\/|\.(?:pdf|docx)\b|pdf_page|book_page|source_errata/i.test(educationalText),
  'Learning material must not expose document or extraction metadata.');

console.log(`Learning data: ${coveredCore.size} core rules reachable, ${referenceCount} valid edition-scoped references, bilingual content and private-data safety passed.`);
