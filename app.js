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
