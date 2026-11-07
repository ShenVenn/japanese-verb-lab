import { forms, verbs, conjugate, answerFor, toRomaji, normalize, skipForms, kana } from './conjugation.js?v=4';
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
const state={level:null,forms:new Set(),count:10,deck:[],index:0,results:[],review:false,group:'all'};
/* ===== Nhóm động từ: Nhóm 1 = godan, Nhóm 2 = ichidan, Nhóm 3 = する + 来る ===== */
const GROUPS=[['g1','Nhóm 1','五段 · godan'],['g2','Nhóm 2','一段 · ichidan'],['g3','Nhóm 3','する · 来る'],['all','Tất cả','Cả 3 nhóm']];
const groupOf=v=>v.group==='godan'?'g1':v.group==='ichidan'?'g2':'g3';
const groupIndex=()=>Math.max(0,GROUPS.findIndex(g=>g[0]===state.group));
function buildPool(group){const fs=forms.filter(f=>state.forms.has(f.id));return verbs.filter(v=>(state.level==='all'||levelOf(v)===state.level)&&(group==='all'||groupOf(v)===group)).flatMap(v=>fs.filter(f=>!(skipForms[v.reading]||[]).includes(f.id)).map(f=>({v,f})))}
function groupSliderHTML(){return `<div class="group-slider" id="groupSlider"><span class="gs-label" id="gsLabel"></span><input type="range" id="gsRange" min="0" max="3" step="1" value="${groupIndex()}" aria-label="Chọn nhóm động từ"></div>`}
function paintGroup(i){const el=$('#groupSlider');if(!el)return;el.style.setProperty('--f',i/3);el.style.setProperty('--cur','var(--gs'+i+')');for(let k=0;k<4;k++)el.style.setProperty('--d'+k,k<=i?'var(--tick-on)':'var(--tick-off)');const lb=$('#gsLabel');lb.textContent=GROUPS[i][1];el.title=GROUPS[i][1]+' · '+GROUPS[i][2];$('#gsRange').setAttribute('aria-valuetext',GROUPS[i][1])}
/* Đổi nhóm giữa chừng: giữ câu đã làm, chỉ làm mới các câu còn lại */
function applyGroup(g){const pool=buildPool(g);if(!pool.length)return false;state.group=g;const keep=state.deck[state.index],remaining=state.deck.length-state.index,keepOk=g==='all'||groupOf(keep.v)===g;let rest=keepOk?[keep]:[];while(rest.length<remaining)rest.push(...shuffle(pool));rest.length=remaining;state.deck=[...state.deck.slice(0,state.index),...rest];if(state.deck[state.index]!==keep){const {v,f}=state.deck[state.index];$('.practice-card h2 span').textContent=lowerFirst(f.label);$('.source b').textContent=conjugate(v,'masu');$('.source small').textContent=masuKanji(v);const a=$('#answer');if(a){a.value='';clearAnswerError()}}return true}
function attachGroupSlider(){const r=$('#gsRange');if(!r)return;paintGroup(+r.value);let t=0;r.addEventListener('input',()=>{const i=+r.value;if(applyGroup(GROUPS[i][0])){paintGroup(i);return}r.value=groupIndex();paintGroup(+r.value);const el=$('#groupSlider');el.classList.remove('nope');void el.offsetWidth;el.classList.add('nope');$('#gsLabel').textContent='Chưa có từ';clearTimeout(t);t=setTimeout(()=>paintGroup(+r.value),1300)});r.addEventListener('pointerup',()=>{const a=$('#answer');if(a)a.focus()})}
function levelOf(v){return v.level||(n5.has(v.reading)?'N5':'N4')}
function masuKanji(v){const kana=conjugate(v,'masu');if(v.group==='kuru')return '来ます';if(v.group==='suru'){if(v.word==='する')return kana;const rs=v.reading.slice(0,-2),ws=v.word.slice(0,-2);return ws+kana.slice(rs.length)}const readingStem=v.reading.slice(0,-1),writtenStem=v.word.slice(0,-1);return writtenStem+kana.slice(readingStem.length)}
function lowerFirst(text){return text.charAt(0).toLowerCase()+text.slice(1)}
function renderSetup(){const levels=[['N5','Động từ N5','Chỉ động từ cấp N5'],['N4','Động từ N4','Chỉ động từ cấp N4'],['all','Tất cả','Gộp động từ N5 + N4']];$('#levelChoices').innerHTML=levels.map(([id,title,sub])=>`<button class="level ${state.level===id?'selected':''}" data-level="${id}"><b>${title}</b><small>${sub}</small></button>`).join('');document.querySelectorAll('.level').forEach(b=>b.onclick=()=>{state.level=b.dataset.level;renderSetup()});$('#formChoices').innerHTML=forms.filter(f=>f.level==='N5'||f.level==='N4').map(f=>`<label class="form ${state.forms.has(f.id)?'selected':''}"><input type="checkbox" value="${f.id}" ${state.forms.has(f.id)?'checked':''}><span><b>${f.label}</b><small>${f.jp} · ${f.hint}</small></span><em>${f.level}</em></label>`).join('');document.querySelectorAll('.form input').forEach(x=>x.onchange=()=>{x.checked?state.forms.add(x.value):state.forms.delete(x.value);renderSetup()});document.querySelectorAll('#countChoices button').forEach(b=>b.onclick=()=>{state.count=+b.dataset.count;document.querySelectorAll('#countChoices button').forEach(x=>x.classList.toggle('selected',x===b))})}
function makeDeck(){if(!state.level)return alert('Hãy chọn cấp độ động từ.');let pool=buildPool(state.group);if(!pool.length&&state.group!=='all'){state.group='all';pool=buildPool('all')}if(!pool.length)return alert('Hãy chọn ít nhất một thể cần chia.');state.deck=[];while(state.deck.length<state.count)state.deck.push(...shuffle(pool));state.deck=state.deck.slice(0,state.count);state.index=0;state.results=[];state.review=false;$('#setup').hidden=true;$('#practice').hidden=false;renderQuestion()}
function renderQuestion(){if(state.index>=state.deck.length)return finish();const {v,f}=state.deck[state.index],source=conjugate(v,'masu');$('#practice').innerHTML=`<section class="practice-card"><div class="progress"><span>${state.review?'Ôn lại · ':''}Động từ ${state.index+1}/${state.deck.length}</span>${state.review?`<span>${f.level} · ${f.jp}</span>`:groupSliderHTML()}</div><p class="kicker">HÃY CHIA ĐỘNG TỪ</p><h2>Đổi sang <span>${lowerFirst(f.label)}</span></h2><div class="source"><b>${source}</b><small>${masuKanji(v)}</small></div><label class="answer-label" for="answer">Đáp án của bạn</label><div class="answer-row"><input id="answer" lang="ja" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Gõ romaji, tự đổi sang hiragana" aria-describedby="answerError"><button id="next" class="primary">Tiếp theo →</button></div><p class="input-error" id="answerError" role="alert" hidden>Hãy nhập ít nhất một ký tự để tiếp tục.</p><p class="enter-hint">Gõ romaji (vd: <b>tabeta</b> → たべた), gõ <b>nn</b> để ra ん. Nhấn Enter để sang động từ tiếp theo.</p></section>`;attachGroupSlider();attachKana($('#answer'));$('#answer').addEventListener('input',clearAnswerError);$('#answer').focus();$('#answer').onkeydown=e=>{if(e.key==='Enter'&&!e.isComposing)nextQuestion()};$('#next').onclick=nextQuestion}
function showAnswerError(){const input=$('#answer'),err=$('#answerError');err.hidden=false;input.setAttribute('aria-invalid','true');input.classList.remove('shake');void input.offsetWidth;input.classList.add('shake');input.focus()}
function clearAnswerError(){const input=$('#answer'),err=$('#answerError');if(!input||!err)return;err.hidden=true;input.removeAttribute('aria-invalid');input.classList.remove('shake')}
function nextQuestion(){const {v,f}=state.deck[state.index],expected=answerFor(v,f.id),entered=$('#answer').value;if(!entered.trim()){showAnswerError();return}const ok=[normalize(expected),normalize(toRomaji(expected))].includes(normalize(entered))||normalize(toKana(entered,true))===normalize(expected);state.results.push({v,f,expected,entered,ok});recordAnswer(v,f,ok);state.index++;renderQuestion()}
function finish(){if(!state.review)bumpSession();const total=state.results.length,correct=state.results.filter(r=>r.ok).length,wrong=state.results.filter(r=>!r.ok),summary=wrong.length?'Xem lại từng đáp án bên dưới. Ô xanh là đúng, ô đỏ là cần ôn lại.':'Tuyệt vời! Bạn đã làm đúng tất cả các câu.';$('#practice').innerHTML=`<section class="result-card"><p class="kicker">HOÀN THÀNH</p><h2>${state.review?'Kết quả ôn lại':'Kết quả'}: ${correct}/${total} đúng</h2><p class="summary">${summary}</p><div class="result-list">${state.results.map((r,i)=>`<article class="result ${r.ok?'correct':'incorrect'}"><span>${i+1}</span><div><b>${conjugate(r.v,'masu')}</b><small>${masuKanji(r.v)}</small></div><div class="to">→ ${r.f.label}</div><div class="user-answer">Bạn nhập: ${r.entered||'—'}</div><div class="ans"><strong>${r.expected}</strong>${r.ok?'':whyHTML(r)}</div></article>`).join('')}</div><div class="result-actions">${wrong.length?`<button id="review" class="primary review">Ôn lại ${wrong.length} từ đã sai</button>`:''}<button id="restart" class="primary">Luyện bài mới</button></div></section>`;
  attachWhy();const reviewBtn=$('#review');
  if(reviewBtn)reviewBtn.onclick=()=>{state.deck=shuffle(wrong.map(r=>({v:r.v,f:r.f})));state.index=0;state.results=[];state.review=true;renderQuestion();window.scrollTo({top:0,behavior:'smooth'})};
  $('#restart').onclick=()=>{state.review=false;$('#setup').hidden=false;$('#practice').hidden=true;location.hash='setup'}}
$('#start').onclick=makeDeck;renderSetup();
/* ===== Thống kê: lưu vào localStorage (vài KB, chỉ ghi khi xong một câu) ===== */
const STATS_KEY='verbLabStats',WD=['CN','T2','T3','T4','T5','T6','T7'];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const dayKey=(d=new Date())=>{const z=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate())};
const emptyStats=()=>({t:0,c:0,sessions:0,days:{},forms:{},verbs:{}});
function loadStats(){try{const s=JSON.parse(localStorage.getItem(STATS_KEY));if(s&&typeof s==='object')return {...emptyStats(),...s}}catch(e){}return emptyStats()}
function saveStats(s){try{localStorage.setItem(STATS_KEY,JSON.stringify(s))}catch(e){}}
function recordAnswer(v,f,ok){const s=loadStats(),k=dayKey(),n=ok?1:0;s.t++;s.c+=n;const d=s.days[k]||(s.days[k]={t:0,c:0});d.t++;d.c+=n;const fm=s.forms[f.id]||(s.forms[f.id]={t:0,c:0});fm.t++;fm.c+=n;const vb=s.verbs[v.reading]||(s.verbs[v.reading]={t:0,w:0,word:v.word});vb.t++;vb.w+=1-n;saveStats(s)}
function bumpSession(){const s=loadStats();s.sessions++;saveStats(s)}
function streakOf(days){let n=0;const d=new Date();if(!days[dayKey(d)])d.setDate(d.getDate()-1);while(days[dayKey(d)]){n++;d.setDate(d.getDate()-1)}return n}
const pctOf=(c,t)=>t?Math.round(c/t*100):0,tone=p=>p>=85?'hi':p>=60?'mid':'lo';

function renderStats(){
  const s=loadStats(),el=$('#stats'),head='<p class="kicker">THỐNG KÊ</p><h2>Tiến độ <span>luyện tập</span></h2>';
  if(!s.t){
    el.innerHTML=`<section class="practice-card stats-card">${head}<div class="st-empty"><b>Chưa có dữ liệu</b><p>Làm một bài luyện tập, kết quả từng câu sẽ được lưu ở đây (chỉ trên trình duyệt này).</p><button type="button" class="primary" id="stGo">Bắt đầu luyện tập</button></div></section>`;
    $('#stGo').onclick=()=>showView('setup');return;
  }
  const week=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);week.push({x:s.days[dayKey(d)]||{t:0,c:0},l:i===0?'Nay':WD[d.getDay()]})}
  const max=Math.max(1,...week.map(w=>w.x.t));
  const fr=forms.map(f=>({f,x:s.forms[f.id]})).filter(r=>r.x&&r.x.t).sort((a,b)=>a.x.c/a.x.t-b.x.c/b.x.t);
  const vr=Object.entries(s.verbs).filter(([,x])=>x.w>0).sort((a,b)=>b[1].w-a[1].w||a[1].t-b[1].t).slice(0,6);
  const tile=(b,l)=>`<div class="st-stat"><b>${b}</b><small>${l}</small></div>`;
  el.innerHTML=`<section class="practice-card stats-card">${head}
    <div class="st-summary">${tile(s.t,'Câu đã làm')}${tile(pctOf(s.c,s.t)+'%','Độ chính xác')}${tile(streakOf(s.days),'Ngày liên tiếp')}${tile(s.sessions,'Bài hoàn thành')}</div>
    <h3>7 ngày gần nhất <small><i class="ok"></i>đúng <i class="wr"></i>sai</small></h3>
    <div class="st-week">${week.map(w=>`<div class="st-col" title="${w.x.t} câu · ${w.x.c} đúng"><div class="st-plot"><div class="st-bar" style="height:${w.x.t/max*100}%;${w.x.t?'min-height:5px':''}"><i class="wr" style="flex:${w.x.t-w.x.c}"></i><i class="ok" style="flex:${w.x.c}"></i></div></div><small class="st-day">${w.l}</small><small class="st-cnt">${w.x.t}</small></div>`).join('')}</div>
    <h3>Độ chính xác theo thể <small>thể yếu nhất ở trên cùng</small></h3>
    <div class="st-forms">${fr.map(({f,x})=>{const p=pctOf(x.c,x.t);return `<div class="st-row"><span class="st-name">${esc(f.label)}<small>${esc(f.jp)}</small></span><div class="st-track"><i class="${tone(p)}" style="width:${p}%"></i></div><span class="st-pct">${p}%<small>${x.c}/${x.t}</small></span></div>`}).join('')}</div>
    <h3>Động từ hay sai</h3>
    ${vr.length?`<ul class="st-verbs">${vr.map(([r,x])=>`<li><span class="st-vw" lang="ja">${esc(x.word||r)}</span><span class="st-vr" lang="ja">${esc(r)}</span><em>sai ${x.w}/${x.t} lần</em></li>`).join('')}</ul>`:'<p class="st-none">Chưa có động từ nào bị sai. Giỏi quá!</p>'}
    <div class="st-actions"><button type="button" class="st-reset" id="stReset">Xóa thống kê</button></div></section>`;
  $('#stReset').onclick=function(){
    if(this.dataset.arm){try{localStorage.removeItem(STATS_KEY)}catch(e){}renderStats();return}
    this.dataset.arm='1';this.textContent='Bấm lần nữa để xóa hết';this.classList.add('armed');
    setTimeout(()=>{if(this.isConnected){delete this.dataset.arm;this.textContent='Xóa thống kê';this.classList.remove('armed')}},4000);
  };
}

/* ===== Giải thích vì sao sai: dấu "!" ở mỗi câu sai ===== */
const GROUP_NAME={godan:'Nhóm 1',ichidan:'Nhóm 2',suru:'Nhóm 3',kuru:'Nhóm 3'};
const VOWEL={a:'あ',e:'え',o:'お',u:'う'};
const GODAN_ROW={dictionary:['u',''],nai:['a','ない'],nakatta:['a','なかった'],potential:['e','ます'],volitional:['o','う'],imperative:['e',''],prohibitive:['u','な'],ba:['e','ば'],passive:['a','れます'],causative:['a','せます']};
const ICHIDAN_RULE={dictionary:'る',te:'て',ta:'た',nai:'ない',nakatta:'なかった',potential:'られます',volitional:'よう',imperative:'ろ',prohibitive:'るな',ba:'れば',passive:'られます',causative:'させます'};
const TE_TA={'う':'って','つ':'って','る':'って','む':'んで','ぶ':'んで','ぬ':'んで','く':'いて','ぐ':'いで','す':'して'};

/* Quy tắc luôn đi từ thể ます (trước → sau khi chia).
   Phần đáp án cần nhớ bọc trong [[...]] để hiện thành ô nổi bật; "\n" = xuống dòng. */
function ruleFor(v,f){
  const id=f.id,e=v.reading.slice(-1);
  if(id==='masu')return 'Đề đã cho sẵn thể ます, chỉ cần viết lại.';
  if(v.group==='suru'||v.group==='kuru'){
    const base=v.group==='suru'?{group:'suru',reading:'する'}:{group:'kuru',reading:'くる'};
    let r=`Nhóm 3: bất quy tắc, cần học thuộc.\n${conjugate(base,'masu')} → [[${answerFor(base,id)}]]`;
    if(v.group==='suru'&&v.reading!=='する')r+=`\nGiữ nguyên phần danh từ (${v.reading.slice(0,-2)}), chỉ đổi する.`;
    return r;
  }
  if(v.group==='ichidan')return `Nhóm 2: bỏ ます → [[${ICHIDAN_RULE[id]}]]`;
  if(id==='te'||id==='ta'){
    const past=id==='ta';
    if(v.reading==='いく')return `Ngoại lệ của 行く: [[${past?'いった':'いって'}]] (không phải ${past?'いた':'いいて'})`;
    const suf=TE_TA[e];
    return `Nhóm 1: ${kana[e].i} → [[${past?suf.replace(/て$/,'た').replace(/で$/,'だ'):suf}]]`;
  }
  if(v.reading==='ある'&&(id==='nai'||id==='nakatta'))return `Ngoại lệ của ある: thể phủ định là [[${id==='nai'?'ない':'なかった'}]] (không phải あらない)`;
  const [row,suf]=GODAN_ROW[id];
  return `Nhóm 1: cột い → [[${VOWEL[row]}${suf?`+${suf}`:''}]]`;
}
const pillify=t=>t.replace(/\[\[(.+?)\]\]/g,'<span class="pill" lang="ja">$1</span>');

function causeFor(r){
  const {v,f,expected,entered}=r;
  if(!entered.trim())return 'Bạn chưa nhập đáp án.';
  const typed=toKana(entered,true),e=normalize(typed);
  if(/[a-z]/i.test(typed))return 'Đáp án còn ký tự chưa đổi sang hiragana, hãy kiểm tra lại cách gõ romaji.';
  if(normalize(expected).endsWith('ます')&&e===normalize(conjugate(v,f.id)))return 'Đề cho thể ます nên đáp án cũng phải kết thúc bằng ます (〜ます), bạn đã nhập dạng 〜る.';
  const skip=skipForms[v.reading]||[];
  const other=forms.find(g=>g.id!==f.id&&!skip.includes(g.id)&&normalize(answerFor(v,g.id))===e);
  if(other)return `Bạn đã nhập ${lowerFirst(other.label)} (${answerFor(v,other.id)}), nhưng đề yêu cầu ${lowerFirst(f.label)}.`;
  if((v.group==='godan'||v.group==='ichidan')&&v.reading.endsWith('る')){
    const alt=v.group==='godan'?'ichidan':'godan';
    if(normalize(answerFor({...v,group:alt},f.id))===e)return `${v.word} thuộc ${v.group==='godan'?'nhóm 1':'nhóm 2'} dù đuôi る, bạn đã chia như ${alt==='godan'?'nhóm 1':'nhóm 2'}.`;
  }
  return null;
}

function whyHTML(r){
  const {v,f}=r,cause=causeFor(r);
  return `<span class="why"><button type="button" class="why-btn" aria-expanded="false" aria-label="Xem vì sao sai">!</button><span class="why-pop" role="tooltip"><b class="why-title">Vì sao sai?</b>${cause?`<span class="why-cause">${esc(cause)}</span>`:''}<span class="why-rule"><i>Quy tắc</i>${ruleFor(v,f).split('\n').map(l=>`<span class="rl">${pillify(esc(l))}</span>`).join('')}</span><span class="why-meta"><span><i>Nhóm</i>${esc(GROUP_NAME[v.group])}</span><span><i>Nghĩa</i>${esc(v.meaning)}</span></span></span></span>`;
}
function closeWhy(except){document.querySelectorAll('.why.open').forEach(w=>{if(w!==except){w.classList.remove('open');w.querySelector('.why-btn').setAttribute('aria-expanded','false')}})}
function attachWhy(){
  document.querySelectorAll('.why').forEach(w=>{const b=w.querySelector('.why-btn');
    b.addEventListener('click',e=>{e.stopPropagation();const open=!w.classList.contains('open');closeWhy(w);w.classList.toggle('open',open);b.setAttribute('aria-expanded',String(open))});
  });
}
document.addEventListener('click',e=>{if(!e.target.closest('.why'))closeWhy(null)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeWhy(null)});

/* Chuyển giữa trang Luyện tập và trang Thống kê */
function showView(view){
  $('#practice').hidden=true;$('#practice').innerHTML='';
  $('#setup').hidden=view!=='setup';$('#stats').hidden=view!=='stats';
  document.querySelectorAll('a.nav-item').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+view));
  if(view==='stats')renderStats();
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.brand, a.nav-item').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showView(a.getAttribute('href')==='#stats'?'stats':'setup')}));

/* Gắn bộ chuyển romaji -> hiragana vào ô nhập */
function attachKana(input){
  let composing=false,prev='',nnEnd=false;
  const convert=()=>{
    if(composing)return;
    let before=input.value;
    // vừa gõ "nn" (ra ん) rồi gõ tiếp nguyên âm/y -> hiểu là ん + na/ni/nu/ne/no/nya... (vd: annai -> あんない)
    if(nnEnd&&before.length===prev.length+1&&before.startsWith(prev)&&'aiueoy'.includes(before.slice(-1).toLowerCase()))before=prev+'n'+before.slice(-1);
    const after=toKana(before);
    nnEnd=/nn$/i.test(before)&&after.endsWith('ん');
    prev=after;
    if(after!==input.value){input.value=after;input.setSelectionRange(after.length,after.length)}
  };
  input.addEventListener('compositionstart',()=>{composing=true});
  input.addEventListener('compositionend',()=>{composing=false;convert()});
  input.addEventListener('input',convert);
}

/* ===== Cánh hoa anh đào bay theo gió (chỉ chạy ở trang chủ) ===== */
(function sakura(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cv=document.createElement('canvas'),ctx=cv.getContext('2d');
  cv.id='petals';cv.setAttribute('aria-hidden','true');
  cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:6';
  document.body.appendChild(cv);
  let W=0,H=0,dpr=1,petals=[],raf=0,last=0;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  function resize(){
    dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.max(14,Math.min(34,Math.round(W/65)));
    while(petals.length<n)petals.push(spawn(true));
    petals.length=n;
  }
  function spawn(anywhere){
    const fromTop=Math.random()<.65,p={
      s:rnd(5,9),rot:rnd(0,6.28),spin:rnd(-.025,.025),flip:rnd(0,6.28),flipSpd:rnd(.02,.05),
      vy:rnd(.45,1.1),vx:rnd(.5,1.3),phase:rnd(0,6.28),sway:rnd(.4,.9),a:rnd(.55,.9),
    };
    if(anywhere){p.x=rnd(-20,W);p.y=rnd(-20,H)}
    else if(fromTop){p.x=rnd(-60,W);p.y=rnd(-30,-8)}
    else{p.x=rnd(-30,-8);p.y=rnd(-20,H*.7)}
    return p;
  }
  function draw(p){
    const s=p.s;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.scale(1,.35+.65*Math.abs(Math.cos(p.flip)));
    const g=ctx.createLinearGradient(0,-s,0,s);g.addColorStop(0,'#ffe3ec');g.addColorStop(1,'#ff9fba');
    ctx.globalAlpha=p.a;ctx.fillStyle=g;
    ctx.beginPath();ctx.moveTo(0,-s);
    ctx.bezierCurveTo(s*.95,-s*.7,s*.8,s*.55,s*.12,s);
    ctx.lineTo(0,s*.78);ctx.lineTo(-s*.12,s);
    ctx.bezierCurveTo(-s*.8,s*.55,-s*.95,-s*.7,0,-s);
    ctx.fill();ctx.restore();
  }
  function frame(t){
    raf=requestAnimationFrame(frame);
    const dt=Math.min((t-(last||t))/16.67,3);last=t;
    // gió: lúc mạnh lúc nhẹ, thổi từ trái sang phải
    const wind=1+.7*Math.sin(t/2600)+.35*Math.sin(t/900+1.3);
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<petals.length;i++){
      const p=petals[i];
      p.phase+=.025*dt;p.flip+=p.flipSpd*dt;p.rot+=(p.spin+.01*wind)*dt;
      p.x+=(p.vx*wind+Math.sin(p.phase)*p.sway)*dt;
      p.y+=(p.vy+.25*Math.max(wind,0)+Math.cos(p.phase*.8)*.25)*dt;
      if(p.x>W+30||p.y>H+30||p.x<-80)petals[i]=spawn(false);else draw(p);
    }
  }
  function start(){if(!raf&&!document.hidden){last=0;raf=requestAnimationFrame(frame)}}
  function stop(){cancelAnimationFrame(raf);raf=0;ctx.clearRect(0,0,W,H)}
  const sync=()=>{$('#setup').hidden?stop():start()};
  new MutationObserver(sync).observe($('#setup'),{attributes:true,attributeFilter:['hidden']});
  document.addEventListener('visibilitychange',()=>document.hidden?cancelAnimationFrame(raf)||(raf=0):sync());
  addEventListener('resize',resize);
  resize();sync();
})();

/* ===== Ánh đèn lồng lấp ló trong các tầng của ngôi chùa (nền) ===== */
(function pagodaLights(){
  // Toạ độ tính theo % của ảnh nền japan-background.png (3344 x 1882).
  // Nền đang để 100% 100% + fixed nên overlay fixed khớp đúng với ảnh.
  const W=3344,H=1882;
  const tiers=[
    {y:291,xs:[2829,2842,2857,2871,2885]},          // tầng 1 (trên)
    {y:340,xs:[2820,2834,2849,2864,2879,2893]},     // tầng 2
    {y:393,xs:[2815,2833,2853,2873,2893]},          // tầng 3 (dưới)
  ];
  const layer=document.createElement('div');
  layer.className='pagoda-lights';
  layer.setAttribute('aria-hidden','true');
  const add=(cls,x,y,delay,dur)=>{
    const d=document.createElement('i');
    d.className=cls;
    d.style.left=(x/W*100)+'%';
    d.style.top=(y/H*100)+'%';
    d.style.setProperty('--d',delay+'s');
    d.style.setProperty('--t',dur+'s');
    layer.appendChild(d);
  };
  add('pl-glow',2857,305,0,0); // vầng sáng trăng quanh chùa (chỉ hiện ở chế độ tối)
  tiers.forEach((t,ti)=>{
    // quầng sáng mờ phía sau mỗi tầng
    const cx=t.xs.reduce((a,b)=>a+b,0)/t.xs.length;
    add('pl-halo',cx,t.y,ti*.7,4+ti);
    t.xs.forEach((x,i)=>add('pl-lamp',x,t.y,(Math.random()*3).toFixed(2),(2.2+Math.random()*2.2).toFixed(2)));
  });
  document.body.appendChild(layer);
})();

/* ===== Cài đặt: chế độ sáng / tối (bầu trời đêm) ===== */
(function themeSettings(){
  const root=document.documentElement,KEY='verbLabTheme';
  const btn=$('#settingsBtn'),menu=$('#settingsMenu');
  const choices=[...document.querySelectorAll('[data-theme-choice]')];
  const meta=document.querySelector('meta[name="theme-color"]');

  /* Lớp bầu trời đêm: nằm phía sau mọi nội dung, chỉ hiện ở chế độ tối */
  const sky=document.createElement('div');
  sky.className='night-sky';sky.setAttribute('aria-hidden','true');
  sky.innerHTML='<div class="ns-tint"></div><div class="ns-moon"></div><i class="ns-shoot"></i>';
  const rnd=(a,b)=>a+Math.random()*(b-a);
  for(let i=0;i<85;i++){
    const x=rnd(1,99),y=rnd(1,58);
    if(x<15&&y<32)continue;               // tránh cành hoa anh đào góc trái
    const s=document.createElement('i');
    s.className='ns-star'+(Math.random()<.14?' big':'');
    s.style.cssText=`left:${x}%;top:${y}%;--d:${rnd(0,6).toFixed(2)}s;--t:${rnd(2.5,6).toFixed(2)}s`;
    sky.appendChild(s);
  }
  document.body.insertBefore(sky,document.body.firstChild);

  function apply(theme,save){
    const dark=theme==='dark';
    if(dark)root.setAttribute('data-theme','dark');else root.removeAttribute('data-theme');
    choices.forEach(c=>c.setAttribute('aria-checked',String(c.dataset.themeChoice===(dark?'dark':'light'))));
    if(meta)meta.setAttribute('content',dark?'#0d1235':'#eef6fc');
    if(save){try{localStorage.setItem(KEY,dark?'dark':'light')}catch(e){}}
  }
  apply(root.getAttribute('data-theme')==='dark'?'dark':'light',false);
  choices.forEach(c=>c.addEventListener('click',()=>apply(c.dataset.themeChoice,true)));

  const setOpen=open=>{menu.hidden=!open;btn.setAttribute('aria-expanded',String(open))};
  btn.addEventListener('click',e=>{e.stopPropagation();setOpen(menu.hidden)});
  menu.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('click',()=>setOpen(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setOpen(false);btn.focus()}});
})();
