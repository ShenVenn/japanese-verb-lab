import { buildBank, isCorrect, POS_LABEL } from './vocab.js?v=1';

/* ===== Kiểm tra từ vựng =====
   Màn thiết lập nằm sẵn trong index.html (#quiz). Câu hỏi và kết quả được vẽ vào #practice,
   dùng lại các khung có sẵn (practice-card, result-card) nên tự có giao diện sáng / tối. */
export function initQuiz({ $, shuffle, esc, toKana, attachKana, showView }) {
  const MAX_COUNT = 200;
  const st = { level: 'N5', count: 10, custom: false, mode: 'end', deck: [], i: 0, results: [], review: false, locked: false };
  const all = (sel) => [...document.querySelectorAll(sel)];

  /* ---------- Màn thiết lập ---------- */
  function paintSetup() {
    all('#qLevel .level').forEach(b => {
      const on = b.dataset.level === st.level;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('small').textContent = `${buildBank(b.dataset.level).length} từ`;
    });
    all('#qCount button').forEach(b => b.classList.toggle('selected', !st.custom && +b.dataset.count === st.count));
    all('#qMode .level').forEach(b => {
      const on = b.dataset.mode === st.mode;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const size = buildBank(st.level).length;
    $('#qNote').textContent = st.count > size
      ? `Bộ từ chỉ có ${size} từ, nên một số từ sẽ lặp lại.`
      : `Mỗi lượt là một từ khác nhau (bộ từ có ${size} từ).`;
  }
  function readCustom() {
    const raw = $('#qCustom').value.trim();
    if (raw === '') return null;
    const n = Number(raw);
    return Number.isInteger(n) && n >= 1 && n <= MAX_COUNT ? n : NaN;
  }
  all('#qLevel .level').forEach(b => b.onclick = () => { st.level = b.dataset.level; paintSetup(); });
  all('#qMode .level').forEach(b => b.onclick = () => { st.mode = b.dataset.mode; paintSetup(); });
  all('#qCount button').forEach(b => b.onclick = () => {
    st.count = +b.dataset.count; st.custom = false; $('#qCustom').value = '';
    $('#qCustomError').hidden = true; paintSetup();
  });
  $('#qCustom').addEventListener('input', () => {
    const n = readCustom();
    $('#qCustomError').hidden = !Number.isNaN(n);
    if (n === null) { st.custom = false; } else if (!Number.isNaN(n)) { st.count = n; st.custom = true; }
    paintSetup();
  });
  $('#qCustom').addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  $('#qStart').onclick = start;
  paintSetup();

  function start() {
    const n = readCustom();
    if (Number.isNaN(n)) { $('#qCustomError').hidden = false; $('#qCustom').focus(); return; }
    if (n !== null) st.count = n;
    const bank = buildBank(st.level);
    let deck = [];
    while (deck.length < st.count) deck.push(...shuffle(bank));
    st.deck = deck.slice(0, st.count);
    st.i = 0; st.results = []; st.review = false;
    $('#quiz').hidden = true; $('#practice').hidden = false;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- Câu hỏi ---------- */
  const isLast = () => st.i === st.deck.length - 1;
  const nextLabel = () => (isLast() ? 'Xem kết quả' : 'Câu tiếp theo') + ' →';

  function renderQuestion() {
    if (st.i >= st.deck.length) return finish();
    const w = st.deck[st.i];
    st.locked = false;
    $('#practice').innerHTML = `<section class="practice-card quiz-card">
      <div class="progress"><span>${st.review ? 'Ôn lại · ' : ''}Từ ${st.i + 1}/${st.deck.length}</span><span>${POS_LABEL[w.pos]} · ${w.level}</span></div>
      <p class="kicker">KIỂM TRA TỪ VỰNG</p>
      <h2>Gõ cách đọc <span>bằng hiragana</span></h2>
      <div class="source quiz-source"><b>${esc(w.meaning)}</b></div>
      <label class="answer-label" for="qAnswer">Đáp án của bạn</label>
      <div class="answer-row"><input id="qAnswer" lang="ja" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Gõ romaji, tự đổi sang hiragana" aria-describedby="qError"><button type="button" id="qNext" class="primary">${st.mode === 'now' ? 'Kiểm tra →' : (isLast() ? 'Hoàn thành →' : 'Tiếp theo →')}</button></div>
      <p class="input-error" id="qError" role="alert" hidden>Hãy nhập đáp án, hoặc bấm “Bỏ qua”.</p>
      <div class="q-feedback" id="qFeedback" role="status" hidden></div>
      <div class="q-foot"><button type="button" class="q-skip" id="qSkip">Bỏ qua, mình không biết</button><span class="enter-hint">Gõ <b>sensei</b> sẽ ra せんせい. Nhấn Enter để ${st.mode === 'now' ? 'kiểm tra và sang câu tiếp' : 'sang câu tiếp theo'}.</span></div>
    </section>`;
    const input = $('#qAnswer');
    attachKana(input);
    input.addEventListener('input', clearError);
    input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing && !e.repeat) submit(false); });
    $('#qNext').onclick = () => submit(false);
    $('#qSkip').onclick = () => submit(true);
    input.focus();
  }
  function clearError() {
    const input = $('#qAnswer'), err = $('#qError');
    if (!input || !err) return;
    err.hidden = true; input.removeAttribute('aria-invalid'); input.classList.remove('shake');
  }
  function showError() {
    const input = $('#qAnswer');
    $('#qError').hidden = false; input.setAttribute('aria-invalid', 'true');
    input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake'); input.focus();
  }

  /* Gợi ý vì sao sai: chỉ nói khi chắc chắn */
  function hintFor(entered) {
    if (!entered.trim()) return 'Bạn đã bỏ qua từ này.';
    if (/[\u4e00-\u9fff]/.test(entered)) return 'Cần nhập cách đọc bằng hiragana, không phải chữ Hán.';
    if (/[a-z]/i.test(toKana(entered, true))) return 'Còn ký tự chưa đổi sang hiragana, hãy kiểm tra lại cách gõ romaji.';
    return '';
  }

  function submit(skip) {
    if (st.locked) { st.i++; renderQuestion(); return; }
    const w = st.deck[st.i], input = $('#qAnswer'), entered = skip ? '' : input.value;
    if (!skip && !entered.trim()) { showError(); return; }
    clearError();
    const ok = !skip && isCorrect(w, toKana(entered, true));
    st.results.push({ w, entered, ok });
    if (st.mode === 'end') { st.i++; renderQuestion(); return; }
    // Hiện kết quả ngay: khoá ô nhập, báo đúng / sai, Enter lần nữa để sang câu kế
    st.locked = true;
    input.readOnly = true;
    $('#qSkip').hidden = true;
    $('#qNext').textContent = nextLabel();
    const fb = $('#qFeedback');
    fb.className = 'q-feedback ' + (ok ? 'ok' : 'bad');
    fb.innerHTML = ok
      ? `<b>Chính xác!</b><span><strong lang="ja">${esc(w.reading)}</strong> <em lang="ja">${esc(w.word)}</em></span>`
      : `<b>Chưa đúng</b><span>Đáp án: <strong lang="ja">${esc(w.reading)}</strong> <em lang="ja">${esc(w.word)}</em></span>${hintFor(entered) ? `<small>${esc(hintFor(entered))}</small>` : ''}`;
    fb.hidden = false;
    // Enter gõ ở ô nhập thì giữ focus ở ô nhập (chuyển focus sang nút sẽ khiến chính phím Enter đó bấm luôn nút và nhảy qua câu kế).
    // Bấm "Bỏ qua" bằng chuột thì nút đó biến mất, nên đưa focus sang nút tiếp theo để Enter vẫn dùng được.
    if (skip) $('#qNext').focus();
  }

  /* ---------- Kết quả ---------- */
  function finish() {
    const total = st.results.length, correct = st.results.filter(r => r.ok).length, wrong = st.results.filter(r => !r.ok);
    const summary = wrong.length
      ? 'Xem lại từng từ bên dưới. Ô xanh là đúng, ô đỏ là cần ôn lại.'
      : 'Tuyệt vời! Bạn đã làm đúng tất cả các từ.';
    $('#practice').innerHTML = `<section class="result-card">
      <p class="kicker">HOÀN THÀNH</p>
      <h2>${st.review ? 'Kết quả ôn lại' : 'Kết quả'}: ${correct}/${total} đúng</h2>
      <p class="summary">${summary}</p>
      <div class="result-list">${st.results.map((r, i) => `<article class="result vocab ${r.ok ? 'correct' : 'incorrect'}">
        <span>${i + 1}</span>
        <div class="vq"><b>${esc(r.w.meaning)}</b><em>${POS_LABEL[r.w.pos]} · ${r.w.level}</em></div>
        <div class="user-answer">Bạn nhập: ${esc(r.entered || '—')}</div>
        <div class="ans"><strong lang="ja">${esc(r.w.reading)}</strong><em class="vk" lang="ja">${esc(r.w.word)}</em></div>
      </article>`).join('')}</div>
      <div class="result-actions">${wrong.length ? `<button type="button" id="qReview" class="primary review">Ôn lại ${wrong.length} từ đã sai</button>` : ''}<button type="button" id="qAgain" class="primary">Kiểm tra mới</button></div>
    </section>`;
    const rv = $('#qReview');
    if (rv) rv.onclick = () => {
      st.deck = shuffle(wrong.map(r => r.w)); st.i = 0; st.results = []; st.review = true;
      renderQuestion(); window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    $('#qAgain').onclick = () => { st.review = false; showView('quiz'); };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
