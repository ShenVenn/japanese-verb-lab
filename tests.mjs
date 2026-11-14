import assert from 'node:assert/strict';
import { verbs, conjugate, answerFor, toRomaji } from './conjugation.js';
const find = (reading) => verbs.find(v => v.reading === reading);
const cases = [
  ['かく','te','かいて'],['かく','ta','かいた'],['かく','nai','かかない'],['のむ','te','のんで'],['はなす','potential','はなせる'],['かう','nai','かわない'],['いく','te','いって'],['いく','ta','いった'],['ある','nai','ない'],['たべる','passive','たべられる'],['たべる','volitional','たべよう'],['する','potential','できる'],['する','causativePassive','させられる'],['くる','ba','くれば'],['くる','imperative','こい'],
];
for (const [verb, form, expected] of cases) assert.equal(conjugate(find(verb),form),expected,`${verb} ${form}`);
assert.equal(toRomaji('かいて'),'kaite');
assert.equal(toRomaji('まって'),'matte');
const dictCases = [['かく','かく'],['たべる','たべる'],['いく','いく'],['ある','ある'],['する','する'],['くる','くる']];
for (const [verb, expected] of dictCases) assert.equal(answerFor(find(verb),'dictionary'),expected,`dictionary ${verb}`);
const politeCases = [
  ['つくる','potential','つくれます'],['はなす','potential','はなせます'],['たべる','potential','たべられます'],
  ['する','potential','できます'],['くる','potential','こられます'],
  ['たべる','passive','たべられます'],['かく','passive','かかれます'],
  ['かく','causative','かかせます'],['する','causative','させます'],
  ['かく','te','かいて'],['かく','volitional','かこう'],['かく','imperative','かけ'],
];
for (const [verb, form, expected] of politeCases) assert.equal(answerFor(find(verb),form),expected,`answerFor ${verb} ${form}`);
for (const v of verbs) assert.ok(v.meaning && !/^to /.test(v.meaning) && /[^\x00-\x7F]|[a-z]/.test(v.meaning), `nghĩa tiếng Việt: ${v.word}`);
console.log(`✓ ${cases.length + 1 + dictCases.length + politeCases.length} conjugation checks passed`);

/* ===== Kiểm tra từ vựng ===== */
import { buildBank, isCorrect, canon } from './vocab.js';
const bank = buildBank('all');
const word = (w) => bank.find(x => x.word === w);
assert.ok(buildBank('N5').length > 100 && buildBank('N4').length > 100, 'mỗi cấp cần đủ từ');
assert.equal(buildBank('N5').length + buildBank('N4').length, bank.length, 'N5 + N4 = tất cả');
assert.ok(isCorrect(word('先生'), 'せんせい'), 'せんせい đúng');
assert.ok(!isCorrect(word('先生'), 'せんせ'), 'thiếu chữ là sai');
assert.ok(isCorrect(word('コーヒー'), 'こおひい') && isCorrect(word('コーヒー'), 'コーヒー') && isCorrect(word('コーヒー'), 'こーひー'), 'katakana / ー');
assert.ok(isCorrect(word('食べる'), 'たべる'), 'động từ thể từ điển');
assert.equal(canon(' せん せい '), 'せんせい');
for (const w of bank) assert.ok(w.reading && w.meaning && w.answers.includes(canon(w.reading)), `từ vựng: ${w.word}`);
console.log(`✓ ${bank.length} từ vựng, kiểm tra đáp án hoạt động`);
