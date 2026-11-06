import { forms, verbs, conjugate, toRomaji, normalize } from './conjugation.js';
/* ===== Gõ romaji -> tự đổi sang hiragana (không cần bật bộ gõ tiếng Nhật của Windows) ===== */
const KANA_MAP = (() => {
  const m = {};
  const rows = {
    '': 'あいうえお', k: 'かきくけこ', g: 'がぎぐげご', s: 'さしすせそ', z: 'ざじずぜぞ',
    t: 'たちつてと', d: 'だぢづでど', n: 'なにぬねの', h: 'はひふへほ', b: 'ばびぶべぼ',
    p: 'ぱぴぷぺぽ', m: 'まみむめも', r: 'らりるれろ',
  };
  const v = 'aiueo';
  for (const [c, ks] of Object.entries(rows)) [...v].forEach((x, i) => { m[c + x] = ks[i]; });
  Object.assign(m, { ya: 'や', yu: 'ゆ', yo: 'よ', wa: 'わ', wo: 'を', wi: 'うぃ', we: 'うぇ',
    shi: 'し', chi: 'ち', tsu: 'つ', fu: 'ふ', ji: 'じ', n: 'ん' });
  // âm ghép (kya, sha, cha...)
  const yo = { ky: 'き', gy: 'ぎ', sh: 'し', sy: 'し', j: 'じ', zy: 'じ', jy: 'じ', ch: 'ち', ty: 'ち', cy: 'ち',
    dy: 'ぢ', ny: 'に', hy: 'ひ', by: 'び', py: 'ぴ', my: 'み', ry: 'り' };
  for (const [c, k] of Object.entries(yo)) {
    m[c + 'a'] = k + 'ゃ'; m[c + 'u'] = k + 'ゅ'; m[c + 'o'] = k + 'ょ';
    if (['sh', 'j', 'ch'].includes(c)) m[c + 'e'] = k + 'ぇ';
  }
  Object.assign(m, { si: 'し', ti: 'ち', tu: 'つ', hu: 'ふ', zi: 'じ', di: 'ぢ', du: 'づ',
    fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ',
    la: 'ぁ', li: 'ぃ', lu: 'ぅ', le: 'ぇ', lo: 'ぉ', xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ', lya: 'ゃ', lyu: 'ゅ', lyo: 'ょ',
    xtu: 'っ', ltu: 'っ', xtsu: 'っ', ltsu: 'っ', '-': 'ー' });
  return m;
})();
const KANA_KEYS = Object.keys(KANA_MAP);
const isVowel = c => 'aiueo'.includes(c);

// Đổi romaji -> hiragana. flush=false: chữ cái đang gõ dở (vd "k", "sh") được giữ nguyên.
function toKana(input, flush = false) {
  const s = input.toLowerCase();
  let out = '', i = 0;
  while (i < s.length) {
    const c = s[i], next = s[i + 1];
    if (!/[a-z'\-]/.test(c)) { out += input[i]; i++; continue; }
    if (c === "'") { out += ''; i++; continue; }
    if (c === 'n') {
      if (next === undefined) { if (flush) out += 'ん'; else out += 'n'; i++; continue; }
      if (next === 'n') {
        const after = s[i + 2];
        if (after !== undefined && (isVowel(after) || after === 'y')) { out += 'ん'; i += 1; }
        else { out += 'ん'; i += 2; }
        continue;
      }
      if (next === "'") { out += 'ん'; i += 2; continue; }
      if (!isVowel(next) && next !== 'y') { out += 'ん'; i++; continue; }
    }
    // phụ âm đôi -> っ (kk, tt, pp, ss...)
    if (c === next && /[a-z]/.test(c) && !isVowel(c) && c !== 'n') { out += 'っ'; i++; continue; }
    let hit = null;
    for (let len = 4; len >= 1; len--) {
      const k = s.slice(i, i + len);
      if (k.length === len && KANA_MAP[k]) { hit = [k, KANA_MAP[k]]; break; }
    }
    if (hit && !(hit[0] === 'n')) {
      // "sh"/"ch"/"ts"... có thể còn dang dở nếu hit ngắn hơn và còn nằm cuối chuỗi
      out += hit[1]; i += hit[0].length; continue;
    }
    const rest = s.slice(i);
    if (!flush && rest.length <= 4 && KANA_KEYS.some(k => k.length > rest.length && k.startsWith(rest))) { out += input.slice(i); break; }
    out += input[i]; i++;
  }
  return out;
}

const $=s=>document.querySelector(s),shuffle=a=>[...a].sort(()=>Math.random()-.5);
const n5=new Set(['かく','はなす','のむ','あそぶ','よむ','まつ','かう','およぐ','しぬ','いく','ある','たべる','みる','ねる','おきる','かりる','でる','する','くる']);
const state={level:null,forms:new Set(),count:10,deck:[],index:0,results:[]};
function levelOf(v){return n5.has(v.reading)?'N5':'N4'}
function masuKanji(v){const kana=conjugate(v,'masu');if(v.group==='kuru')return '来ます';if(v.group==='suru')return kana;const readingStem=v.reading.slice(0,-1),writtenStem=v.word.slice(0,-1);return writtenStem+kana.slice(readingStem.length)}
function lowerFirst(text){return text.charAt(0).toLowerCase()+text.slice(1)}
function renderSetup(){const levels=[['N5','Động từ N5','Chỉ động từ cấp N5'],['N4','Động từ N4','Chỉ động từ cấp N4'],['all','Tất cả','Gộp động từ N5 + N4']];$('#levelChoices').innerHTML=levels.map(([id,title,sub])=>`<button class="level ${state.level===id?'selected':''}" data-level="${id}"><b>${title}</b><small>${sub}</small></button>`).join('');document.querySelectorAll('.level').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;renderSetup()});$('#formChoices').innerHTML=forms.filter(f=>f.level==='N5'||f.level==='N4').map(f=>`<label class="form ${state.forms.has(f.id)?'selected':''}"><input type="checkbox" value="${f.id}" ${state.forms.has(f.id)?'checked':''}><span><b>${f.label}</b><small>${f.jp} · ${f.hint}</small></span><em>${f.level}</em></label>`).join('');document.querySelectorAll('.form input').forEach(x=>x.onchange=()=>{x.checked?state.forms.add(x.value):state.forms.delete(x.value);renderSetup()});document.querySelectorAll('#countChoices button').forEach(b=>b.onclick=()=>{state.count=+b.dataset.count;document.querySelectorAll('#countChoices button').forEach(x=>x.classList.toggle('selected',x===b))})}
function makeDeck(){if(!state.level)return alert('Hãy chọn cấp độ động từ.');const candidates=verbs.filter(v=>state.level==='all'||levelOf(v)===state.level),fs=forms.filter(f=>state.forms.has(f.id));let pool=candidates.flatMap(v=>fs.map(f=>({v,f})));if(!pool.length)return alert('Hãy chọn ít nhất một thể cần chia.');state.deck=[];while(state.deck.length<state.count)state.deck.push(...shuffle(pool));state.deck=state.deck.slice(0,state.count);state.index=0;state.results=[];$('#setup').hidden=true;$('#practice').hidden=false;renderQuestion()}
function renderQuestion(){if(state.index>=state.deck.length)return finish();const {v,f}=state.deck[state.index],source=conjugate(v,'masu');$('#practice').innerHTML=`<section class="practice-card"><div class="progress"><span>Động từ ${state.index+1}/${state.deck.length}</span><span>${f.level} · ${f.jp}</span></div><p class="kicker">HÃY CHIA ĐỘNG TỪ</p><h2>Đổi sang <span>${lowerFirst(f.label)}</span></h2><div class="source"><b>${source}</b><small>${masuKanji(v)}</small></div><label class="answer-label" for="answer">Đáp án của bạn</label><div class="answer-row"><input id="answer" lang="ja" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Gõ romaji, tự đổi sang hiragana"><button id="next" class="primary">Tiếp theo →</button></div><p class="enter-hint">Gõ romaji (vd: <b>tabeta</b> → たべた), gõ <b>nn</b> để ra ん. Nhấn Enter để sang động từ tiếp theo.</p></section>`;attachKana($('#answer'));$('#answer').focus();$('#answer').onkeydown=e=>{if(e.key==='Enter')nextQuestion()};$('#next').onclick=nextQuestion}
function nextQuestion(){const {v,f}=state.deck[state.index],expected=conjugate(v,f.id),entered=$('#answer').value,ok=[normalize(expected),normalize(toRomaji(expected))].includes(normalize(entered))||normalize(toKana(entered,true))===normalize(expected);state.results.push({v,f,expected,entered,ok});state.index++;renderQuestion()}
function finish(){const correct=state.results.filter(r=>r.ok).length;$('#practice').innerHTML=`<section class="result-card"><p class="kicker">HOÀN THÀNH</p><h2>Kết quả: ${correct}/${state.results.length} đúng</h2><p class="summary">Xem lại từng đáp án bên dưới. Ô xanh là đúng, ô đỏ là cần ôn lại.</p><div class="result-list">${state.results.map((r,i)=>`<article class="result ${r.ok?'correct':'incorrect'}"><span>${i+1}</span><div><b>${conjugate(r.v,'masu')} → ${r.f.jp}</b><small>${masuKanji(r.v)}</small></div><div class="user-answer">Bạn nhập: ${r.entered||'—'}</div><div><strong>${r.expected}</strong></div></article>`).join('')}</div><button id="restart" class="primary">Luyện lại</button></section>`;$('#restart').onclick=()=>{$('#setup').hidden=false;$('#practice').hidden=true;location.hash='setup'}}
$('#start').onclick=makeDeck;renderSetup();
function backToSetup(e){e.preventDefault();$('#practice').hidden=true;$('#practice').innerHTML='';$('#setup').hidden=false;window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('.brand, a.nav-item').forEach(a=>a.addEventListener('click',backToSetup));

/* Gắn bộ chuyển romaji -> hiragana vào ô nhập */
function attachKana(input){
  let composing=false;
  const convert=()=>{
    if(composing)return;
    const before=input.value,after=toKana(before);
    if(after!==before){input.value=after;input.setSelectionRange(after.length,after.length)}
  };
  input.addEventListener('compositionstart',()=>{composing=true});
  input.addEventListener('compositionend',()=>{composing=false;convert()});
  input.addEventListener('input',convert);
}
