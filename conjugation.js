export const forms = [
  { id: 'masu', label: 'Thể lịch sự', jp: 'ます形', level: 'N5', hint: 'làm / sẽ làm' },
  { id: 'te', label: 'Thể て', jp: 'て形', level: 'N5', hint: 'nối câu, yêu cầu' },
  { id: 'ta', label: 'Thể quá khứ', jp: 'た形', level: 'N5', hint: 'đã làm' },
  { id: 'nai', label: 'Thể phủ định', jp: 'ない形', level: 'N5', hint: 'không làm' },
  { id: 'nakatta', label: 'Thể phủ định quá khứ', jp: 'なかった形', level: 'N5', hint: 'đã không làm' },
  { id: 'potential', label: 'Thể khả năng', jp: '可能形', level: 'N4', hint: 'có thể làm' },
  { id: 'volitional', label: 'Thể ý chí', jp: '意向形', level: 'N4', hint: 'hãy cùng / sẽ làm' },
  { id: 'imperative', label: 'Thể mệnh lệnh', jp: '命令形', level: 'N4', hint: 'hãy làm!' },
  { id: 'prohibitive', label: 'Thể cấm chỉ', jp: '禁止形', level: 'N4', hint: 'đừng làm!' },
  { id: 'ba', label: 'Thể điều kiện', jp: 'ば形', level: 'N4', hint: 'nếu làm' },
  { id: 'passive', label: 'Thể bị động', jp: '受身形', level: 'N4', hint: 'bị làm' },
  { id: 'causative', label: 'Thể sai khiến', jp: '使役形', level: 'N4', hint: 'bắt / cho làm' },
];

export const verbs = [
  ['書く','かく','kaku','to write','godan'], ['話す','はなす','hanasu','to speak','godan'],
  ['飲む','のむ','nomu','to drink','godan'], ['遊ぶ','あそぶ','asobu','to play','godan'],
  ['読む','よむ','yomu','to read','godan'], ['待つ','まつ','matsu','to wait','godan'],
  ['買う','かう','kau','to buy','godan'], ['泳ぐ','およぐ','oyogu','to swim','godan'],
  ['死ぬ','しぬ','shinu','to die','godan'], ['帰る','かえる','kaeru','to return home','godan'],
  ['走る','はしる','hashiru','to run','godan'], ['入る','はいる','hairu','to enter','godan'],
  ['行く','いく','iku','to go','godan'], ['ある','ある','aru','to exist (inanimate)','godan'],
  ['食べる','たべる','taberu','to eat','ichidan'], ['見る','みる','miru','to see','ichidan'],
  ['寝る','ねる','neru','to sleep','ichidan'], ['起きる','おきる','okiru','to wake up','ichidan'],
  ['借りる','かりる','kariru','to borrow','ichidan'], ['出る','でる','deru','to leave','ichidan'],
  ['開ける','あける','akeru','to open','ichidan'], ['閉める','しめる','shimeru','to close','ichidan'],
  ['作る','つくる','tsukuru','to make','godan'], ['持つ','もつ','motsu','to hold','godan'],
  ['座る','すわる','suwaru','to sit','godan'], ['立つ','たつ','tatsu','to stand','godan'],
  ['取る','とる','toru','to take','godan'], ['言う','いう','iu','to say','godan'],
  ['する','する','suru','to do','suru'], ['来る','くる','kuru','to come','kuru'],
].map(([word, reading, romaji, meaning, group]) => ({ word, reading, romaji, meaning, group }));

const kana = {
  'う': { a:'わ', i:'い', e:'え', o:'お' }, 'く': { a:'か', i:'き', e:'け', o:'こ' },
  'ぐ': { a:'が', i:'ぎ', e:'げ', o:'ご' }, 'す': { a:'さ', i:'し', e:'せ', o:'そ' },
  'つ': { a:'た', i:'ち', e:'て', o:'と' }, 'ぬ': { a:'な', i:'に', e:'ね', o:'の' },
  'ぶ': { a:'ば', i:'び', e:'べ', o:'ぼ' }, 'む': { a:'ま', i:'み', e:'め', o:'も' },
  'る': { a:'ら', i:'り', e:'れ', o:'ろ' },
};

const romajiMaps = [
  ['きゃ','kya'],['きゅ','kyu'],['きょ','kyo'],['しゃ','sha'],['しゅ','shu'],['しょ','sho'],['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho'],['にゃ','nya'],['ひゃ','hya'],['みゃ','mya'],['りゃ','rya'],
  ['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go'],['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo'],['だ','da'],['で','de'],['ど','do'],['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo'],['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po'],
  ['あ','a'],['い','i'],['う','u'],['え','e'],['お','o'],['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko'],['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so'],['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to'],['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no'],['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho'],['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo'],['や','ya'],['ゆ','yu'],['よ','yo'],['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro'],['わ','wa'],['を','o'],['ん','n'],['っ',''],['ー',''],
];

function stem(v) { return v.reading.slice(0, -1); }
function ending(v) { return v.reading.slice(-1); }
function godanBase(v, row) { return stem(v) + kana[ending(v)][row]; }
function godanTe(v, past = false) {
  if (v.reading === 'いく') return stem(v) + (past ? 'った' : 'って');
  const end = ending(v); const table = { 'う':'って','つ':'って','る':'って','む':'んで','ぶ':'んで','ぬ':'んで','く':'いて','ぐ':'いで','す':'して' };
  let value = stem(v) + table[end]; if (past) value = value.replace(/て$/, 'た').replace(/で$/, 'だ'); return value;
}

export function conjugate(v, form) {
  if (v.group === 'suru') return ({ masu:'します',te:'して',ta:'した',nai:'しない',nakatta:'しなかった',potential:'できる',volitional:'しよう',imperative:'しろ',prohibitive:'するな',ba:'すれば',passive:'される',causative:'させる',causativePassive:'させられる' })[form];
  if (v.group === 'kuru') return ({ masu:'きます',te:'きて',ta:'きた',nai:'こない',nakatta:'こなかった',potential:'こられる',volitional:'こよう',imperative:'こい',prohibitive:'くるな',ba:'くれば',passive:'こられる',causative:'こさせる',causativePassive:'こさせられる' })[form];
  if (v.reading === 'ある' && form === 'nai') return 'ない';
  if (v.reading === 'ある' && form === 'nakatta') return 'なかった';
  if (v.group === 'ichidan') return ({ masu:stem(v)+'ます',te:stem(v)+'て',ta:stem(v)+'た',nai:stem(v)+'ない',nakatta:stem(v)+'なかった',potential:stem(v)+'られる',volitional:stem(v)+'よう',imperative:stem(v)+'ろ',prohibitive:v.reading+'な',ba:stem(v)+'れば',passive:stem(v)+'られる',causative:stem(v)+'させる',causativePassive:stem(v)+'させられる' })[form];
  return ({ masu:godanBase(v,'i')+'ます',te:godanTe(v),ta:godanTe(v,true),nai:godanBase(v,'a')+'ない',nakatta:godanBase(v,'a')+'なかった',potential:godanBase(v,'e')+'る',volitional:godanBase(v,'o')+'う',imperative:godanBase(v,'e'),prohibitive:v.reading+'な',ba:godanBase(v,'e')+'ば',passive:godanBase(v,'a')+'れる',causative:godanBase(v,'a')+'せる',causativePassive:godanBase(v,'a')+'せられる' })[form];
}

export function toRomaji(kanaText) {
  let out='';
  for (let i=0; i<kanaText.length; i++) {
    if (kanaText[i] === 'っ') {
      const nextPair = kanaText.slice(i + 1, i + 3);
      const next = romajiMaps.find(([k]) => k === nextPair) || romajiMaps.find(([k]) => k === kanaText[i + 1]);
      if (next?.[1]) out += next[1][0];
      continue;
    }
    const pair = kanaText.slice(i,i+2); const matched = romajiMaps.find(([k]) => k === pair);
    if (matched) { out += matched[1]; i++; } else { const one = romajiMaps.find(([k]) => k === kanaText[i]); out += one ? one[1] : kanaText[i]; }
  }
  return out;
}

export const normalize = (text) => text.trim().toLowerCase().replace(/[\s\-']/g,'').replace(/ō/g,'ou').replace(/ū/g,'uu');

