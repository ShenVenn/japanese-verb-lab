import { forms, verbs, answerFor } from './conjugation.js?v=4';

/* ===== Trang chủ: bảng giờ tàu + sơ đồ tuyến =====
   Mỗi thể chia là một "ga". Tàu chạy qua từng ga, bảng giờ lật chữ ra đáp án thật
   (lấy từ chính bộ chia động từ của app). Chạm vào ga để xem ngay thể đó. */
export function initHome({ $, shuffle }) {
  const TILES = 8, DWELL = 2600;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SHOW = ['食べる', '飲む', '行く', '来る', 'する', '書く', '見る', '読む', '話す', '待つ', '帰る', '買う', '泳ぐ', '遊ぶ']
    .map(w => verbs.find(v => v.word === w)).filter(Boolean);
  const KANA = [...'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ'];

  const tilesEl = $('#sbTiles'), line = $('#stLine'), scroller = line.parentElement;
  const tiles = Array.from({ length: TILES }, () => {
    const t = document.createElement('span'); t.className = 'sb-tile';
    t.innerHTML = '<span class="sb-face"></span>'; tilesEl.appendChild(t); return t;
  });

  /* Sơ đồ tuyến */
  const stations = forms.map((f, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button" class="stn" aria-label="${f.label}, ${f.jp}"><span class="stn-dot">${String(i + 1).padStart(2, '0')}</span><span class="stn-jp" lang="ja">${[...f.jp].map(c => `<b>${c}</b>`).join('')}</span></button>`;
    line.appendChild(li); return li.firstChild;
  });
  const train = document.createElement('span');
  train.className = 'st-train'; train.setAttribute('aria-hidden', 'true');
  train.innerHTML = '<i></i><i></i><i></i>';
  line.appendChild(train);

  let order = shuffle(SHOW), vi = 0, si = 0, hold = 0, first = true;

  function setTiles(str) {
    const chars = [...str];
    tiles.forEach((t, i) => {
      const next = chars[i] || '', face = t.firstChild;
      if (t.dataset.c === next && !first) return;
      t.dataset.c = next;
      const tok = t._tok = (t._tok || 0) + 1;
      if (reduce) { face.textContent = next; return; }
      let n = 0; const steps = next ? 2 + (i % 2) : 1;
      const run = () => {
        if (t._tok !== tok) return;
        t.classList.remove('flip'); void t.offsetWidth; t.classList.add('flip');
        setTimeout(() => { if (t._tok === tok) face.textContent = n < steps ? KANA[(Math.random() * KANA.length) | 0] : next; }, 95);
        if (n++ < steps) setTimeout(run, 190);
      };
      setTimeout(run, i * 55);
    });
  }

  function go(i, fromUser) {
    si = i;
    const f = forms[i], v = order[vi], ans = answerFor(v, f.id);
    $('#sbDest').textContent = f.jp; $('#sbVi').textContent = f.label;
    $('#sbBase').textContent = v.word; $('#sbMean').textContent = v.meaning;
    $('#sbLive').textContent = `${v.word} ở ${f.label} (${f.jp}): ${ans}`;
    setTiles(ans); first = false;
    stations.forEach((b, k) => { b.classList.toggle('on', k === i); b.classList.toggle('passed', k < i); });
    const b = stations[i];
    const li = b.parentElement;
    train.style.transform = `translateX(${li.offsetLeft + li.offsetWidth / 2 - train.offsetWidth / 2}px)`;
    if (scroller.scrollWidth > scroller.clientWidth) {
      scroller.scrollTo({ left: li.offsetLeft - scroller.clientWidth / 2 + li.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (fromUser) hold = Date.now() + 7000;
  }
  stations.forEach((b, i) => b.addEventListener('click', () => go(i, true)));

  function tick() {
    if ($('#home').hidden || document.hidden || Date.now() < hold || reduce) return;
    if (si >= forms.length - 1) { vi = (vi + 1) % order.length; go(0); } else go(si + 1);
  }
  setInterval(tick, DWELL);
  addEventListener('resize', () => go(si));
  // Lần đầu: đợi font nạp xong để tàu đứng đúng chỗ
  (document.fonts?.ready || Promise.resolve()).then(() => go(0));

  /* ===== Kiểu trang chia thể: "Ga tàu" (mới) hoặc "Cổ điển" (lưu trong Cài đặt) ===== */
  const root = document.documentElement, UIKEY = 'verbLabUi';
  const inVerbPractice = () => { const p = $('#practice'); return !p.hidden && !!p.querySelector('.practice-card:not(.quiz-card), .result-card') && !p.querySelector('.quiz-card, .result.vocab'); };
  const syncStn = () => document.body.classList.toggle('is-stn', root.getAttribute('data-ui') !== 'classic' && (!$('#setup').hidden || inVerbPractice()));
  function applyUi(ui, save) {
    if (ui !== 'classic') ui = 'station';
    root.setAttribute('data-ui', ui);
    document.querySelectorAll('[data-ui-choice]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.uiChoice === ui)));
    if (save) { try { localStorage.setItem(UIKEY, ui); } catch (e) {} }
    syncStn();
  }
  let savedUi = null; try { savedUi = localStorage.getItem(UIKEY); } catch (e) {}
  applyUi(savedUi, false);
  document.querySelectorAll('[data-ui-choice]').forEach(b => b.addEventListener('click', () => applyUi(b.dataset.uiChoice, true)));
  new MutationObserver(syncStn).observe($('#setup'), { attributes: true, attributeFilter: ['hidden'] });
  new MutationObserver(syncStn).observe($('#practice'), { attributes: true, attributeFilter: ['hidden'], childList: true });
}
