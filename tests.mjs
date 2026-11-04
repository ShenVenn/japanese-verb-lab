import assert from 'node:assert/strict';
import { verbs, conjugate, toRomaji } from './conjugation.js';
const find = (reading) => verbs.find(v => v.reading === reading);
const cases = [
  ['かく','te','かいて'],['かく','ta','かいた'],['かく','nai','かかない'],['のむ','te','のんで'],['はなす','potential','はなせる'],['かう','nai','かわない'],['いく','te','いって'],['いく','ta','いった'],['ある','nai','ない'],['たべる','passive','たべられる'],['たべる','volitional','たべよう'],['する','potential','できる'],['する','causativePassive','させられる'],['くる','ba','くれば'],['くる','imperative','こい'],
];
for (const [verb, form, expected] of cases) assert.equal(conjugate(find(verb),form),expected,`${verb} ${form}`);
assert.equal(toRomaji('かいて'),'kaite');
assert.equal(toRomaji('まって'),'matte');
console.log(`✓ ${cases.length + 1} conjugation checks passed`);
