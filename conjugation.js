export const forms = [
  { id: 'masu', label: 'Thể lịch sự', jp: 'ます形', level: 'N5', hint: 'làm / sẽ làm' },
  { id: 'dictionary', label: 'Thể từ điển', jp: '辞書形', level: 'N5', hint: 'dạng gốc, thân mật' },
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
// [chữ Hán, cách đọc, romaji, nghĩa, nhóm, cấp độ]
// 30 từ đầu tiên giữ nguyên thứ tự gốc (tests.mjs dùng find() lấy từ xuất hiện đầu tiên).
  ['書く','かく','kaku','to write','godan','N5'],
  ['話す','はなす','hanasu','to speak','godan','N5'],
  ['飲む','のむ','nomu','to drink','godan','N5'],
  ['遊ぶ','あそぶ','asobu','to play','godan','N5'],
  ['読む','よむ','yomu','to read','godan','N5'],
  ['待つ','まつ','matsu','to wait','godan','N5'],
  ['買う','かう','kau','to buy','godan','N5'],
  ['泳ぐ','およぐ','oyogu','to swim','godan','N5'],
  ['死ぬ','しぬ','shinu','to die','godan','N4'],
  ['帰る','かえる','kaeru','to return home','godan','N5'],
  ['走る','はしる','hashiru','to run','godan','N4'],
  ['入る','はいる','hairu','to enter','godan','N5'],
  ['行く','いく','iku','to go','godan','N5'],
  ['ある','ある','aru','to exist (inanimate)','godan','N5'],
  ['食べる','たべる','taberu','to eat','ichidan','N5'],
  ['見る','みる','miru','to see','ichidan','N5'],
  ['寝る','ねる','neru','to sleep','ichidan','N5'],
  ['起きる','おきる','okiru','to wake up','ichidan','N5'],
  ['借りる','かりる','kariru','to borrow','ichidan','N5'],
  ['出る','でる','deru','to leave','ichidan','N5'],
  ['開ける','あける','akeru','to open','ichidan','N5'],
  ['閉める','しめる','shimeru','to close','ichidan','N5'],
  ['作る','つくる','tsukuru','to make','godan','N5'],
  ['持つ','もつ','motsu','to hold','godan','N5'],
  ['座る','すわる','suwaru','to sit','godan','N5'],
  ['立つ','たつ','tatsu','to stand','godan','N5'],
  ['取る','とる','toru','to take','godan','N5'],
  ['言う','いう','iu','to say','godan','N5'],
  ['する','する','suru','to do','suru','N5'],
  ['来る','くる','kuru','to come','kuru','N5'],
  // ---- N5 · godan ----
  ['会う','あう','au','to meet','godan','N5'],
  ['開く','あく','aku','to open (intr.)','godan','N5'],
  ['洗う','あらう','arau','to wash','godan','N5'],
  ['歩く','あるく','aruku','to walk','godan','N5'],
  ['歌う','うたう','utau','to sing','godan','N5'],
  ['売る','うる','uru','to sell','godan','N5'],
  ['置く','おく','oku','to put','godan','N5'],
  ['押す','おす','osu','to push','godan','N5'],
  ['終わる','おわる','owaru','to end','godan','N5'],
  ['返す','かえす','kaesu','to return (something)','godan','N5'],
  ['掛かる','かかる','kakaru','to take (time/money)','godan','N5'],
  ['貸す','かす','kasu','to lend','godan','N5'],
  ['被る','かぶる','kaburu','to wear (on head)','godan','N5'],
  ['消す','けす','kesu','to turn off','godan','N5'],
  ['切る','きる','kiru','to cut','godan','N5'],
  ['聞く','きく','kiku','to listen / ask','godan','N5'],
  ['曲がる','まがる','magaru','to turn','godan','N5'],
  ['出す','だす','dasu','to take out','godan','N5'],
  ['乗る','のる','noru','to ride','godan','N5'],
  ['登る','のぼる','noboru','to climb','godan','N5'],
  ['履く','はく','haku','to wear (on feet)','godan','N5'],
  ['始まる','はじまる','hajimaru','to begin','godan','N5'],
  ['働く','はたらく','hataraku','to work','godan','N5'],
  ['弾く','ひく','hiku','to play (instrument)','godan','N5'],
  ['引く','ひく','hiku','to pull','godan','N5'],
  ['吹く','ふく','fuku','to blow','godan','N5'],
  ['降る','ふる','furu','to fall (rain)','godan','N5'],
  ['磨く','みがく','migaku','to brush / polish','godan','N5'],
  ['貰う','もらう','morau','to receive','godan','N5'],
  ['休む','やすむ','yasumu','to rest','godan','N5'],
  ['呼ぶ','よぶ','yobu','to call','godan','N5'],
  ['分かる','わかる','wakaru','to understand','godan','N5'],
  ['使う','つかう','tsukau','to use','godan','N5'],
  ['着く','つく','tsuku','to arrive','godan','N5'],
  ['知る','しる','shiru','to know','godan','N5'],
  ['住む','すむ','sumu','to live','godan','N5'],
  ['違う','ちがう','chigau','to differ','godan','N5'],
  ['脱ぐ','ぬぐ','nugu','to take off','godan','N5'],
  ['成る','なる','naru','to become','godan','N5'],
  // ---- N5 · ichidan ----
  ['上げる','あげる','ageru','to give / raise','ichidan','N5'],
  ['浴びる','あびる','abiru','to take (shower)','ichidan','N5'],
  ['居る','いる','iru','to be (animate)','ichidan','N5'],
  ['入れる','いれる','ireru','to put in','ichidan','N5'],
  ['生まれる','うまれる','umareru','to be born','ichidan','N5'],
  ['教える','おしえる','oshieru','to teach','ichidan','N5'],
  ['覚える','おぼえる','oboeru','to memorize','ichidan','N5'],
  ['降りる','おりる','oriru','to get off','ichidan','N5'],
  ['掛ける','かける','kakeru','to hang / make (call)','ichidan','N5'],
  ['着る','きる','kiru','to wear','ichidan','N5'],
  ['出かける','でかける','dekakeru','to go out','ichidan','N5'],
  ['見せる','みせる','miseru','to show','ichidan','N5'],
  ['疲れる','つかれる','tsukareru','to get tired','ichidan','N5'],
  ['忘れる','わすれる','wasureru','to forget','ichidan','N5'],
  // ---- N5 · suru ----
  ['勉強する','べんきょうする','benkyousuru','to study','suru','N5'],
  ['結婚する','けっこんする','kekkonsuru','to marry','suru','N5'],
  ['散歩する','さんぽする','sanposuru','to take a walk','suru','N5'],
  ['洗濯する','せんたくする','sentakusuru','to do laundry','suru','N5'],
  ['掃除する','そうじする','soujisuru','to clean','suru','N5'],
  ['旅行する','りょこうする','riょkousuru','to travel','suru','N5'],
  ['電話する','でんわする','denwasuru','to phone','suru','N5'],
  ['料理する','りょうりする','riょurisuru','to cook','suru','N5'],
  ['練習する','れんしゅうする','renshuusuru','to practice','suru','N5'],
  ['質問する','しつもんする','shitsumonsuru','to ask a question','suru','N5'],
  ['買い物する','かいものする','kaimonosuru','to shop','suru','N5'],
  // ---- N4 · godan ----
  ['上がる','あがる','agaru','to go up','godan','N4'],
  ['集まる','あつまる','atsumaru','to gather','godan','N4'],
  ['謝る','あやまる','ayamaru','to apologize','godan','N4'],
  ['急ぐ','いそぐ','isogu','to hurry','godan','N4'],
  ['動く','うごく','ugoku','to move','godan','N4'],
  ['打つ','うつ','utsu','to hit','godan','N4'],
  ['写す','うつす','utsusu','to copy / photograph','godan','N4'],
  ['移る','うつる','utsuru','to move (to)','godan','N4'],
  ['選ぶ','えらぶ','erabu','to choose','godan','N4'],
  ['送る','おくる','okuru','to send','godan','N4'],
  ['起こす','おこす','okosu','to wake / cause','godan','N4'],
  ['怒る','おこる','okoru','to get angry','godan','N4'],
  ['踊る','おどる','odoru','to dance','godan','N4'],
  ['思う','おもう','omou','to think','godan','N4'],
  ['思い出す','おもいだす','omoidasu','to remember','godan','N4'],
  ['折る','おる','oru','to break / fold','godan','N4'],
  ['変わる','かわる','kawaru','to change','godan','N4'],
  ['決まる','きまる','kimaru','to be decided','godan','N4'],
  ['咲く','さく','saku','to bloom','godan','N4'],
  ['騒ぐ','さわぐ','sawagu','to make noise','godan','N4'],
  ['触る','さわる','sawaru','to touch','godan','N4'],
  ['探す','さがす','sagasu','to search','godan','N4'],
  ['下がる','さがる','sagaru','to go down','godan','N4'],
  ['閉まる','しまる','shimaru','to close (intr.)','godan','N4'],
  ['進む','すすむ','susumu','to advance','godan','N4'],
  ['頼む','たのむ','tanomu','to request','godan','N4'],
  ['足す','たす','tasu','to add','godan','N4'],
  ['続く','つづく','tsuづku','to continue (intr.)','godan','N4'],
  ['付く','つく','tsuku','to be attached','godan','N4'],
  ['通る','とおる','tooru','to pass','godan','N4'],
  ['止まる','とまる','tomaru','to stop (intr.)','godan','N4'],
  ['泊まる','とまる','tomaru','to stay overnight','godan','N4'],
  ['直す','なおす','naosu','to fix','godan','N4'],
  ['治る','なおる','naoru','to recover','godan','N4'],
  ['泣く','なく','naku','to cry','godan','N4'],
  ['無くなる','なくなる','nakunaru','to run out','godan','N4'],
  ['並ぶ','ならぶ','narabu','to line up','godan','N4'],
  ['習う','ならう','narau','to learn','godan','N4'],
  ['盗む','ぬすむ','nusumu','to steal','godan','N4'],
  ['塗る','ぬる','nuru','to paint','godan','N4'],
  ['眠る','ねむる','nemuru','to sleep','godan','N4'],
  ['運ぶ','はこぶ','hakobu','to carry','godan','N4'],
  ['払う','はらう','harau','to pay','godan','N4'],
  ['光る','ひかる','hikaru','to shine','godan','N4'],
  ['拾う','ひろう','hirou','to pick up','godan','N4'],
  ['踏む','ふむ','fumu','to step on','godan','N4'],
  ['太る','ふとる','futoru','to gain weight','godan','N4'],
  ['勝つ','かつ','katsu','to win','godan','N4'],
  ['間に合う','まにあう','maniau','to be in time','godan','N4'],
  ['守る','まもる','mamoru','to protect / keep','godan','N4'],
  ['迷う','まよう','mayou','to get lost','godan','N4'],
  ['回る','まわる','mawaru','to turn around','godan','N4'],
  ['向かう','むかう','mukau','to head toward','godan','N4'],
  ['戻る','もどる','modoru','to return','godan','N4'],
  ['焼く','やく','yaku','to bake / grill','godan','N4'],
  ['破る','やぶる','yaburu','to tear','godan','N4'],
  ['止む','やむ','yamu','to stop (rain)','godan','N4'],
  ['寄る','よる','yoru','to drop by','godan','N4'],
  ['喜ぶ','よろこぶ','yorokobu','to be glad','godan','N4'],
  ['笑う','わらう','warau','to laugh','godan','N4'],
  ['渡す','わたす','watasu','to hand over','godan','N4'],
  ['渡る','わたる','wataru','to cross','godan','N4'],
  ['驚く','おどろく','odoroku','to be surprised','godan','N4'],
  ['落とす','おとす','otosu','to drop','godan','N4'],
  ['当たる','あたる','ataru','to hit / be right','godan','N4'],
  ['通う','かよう','kayou','to commute','godan','N4'],
  ['誘う','さそう','sasou','to invite','godan','N4'],
  ['見つかる','みつかる','mitsukaru','to be found','godan','N4'],
  ['叱る','しかる','shikaru','to scold','godan','N4'],
  ['沸かす','わかす','wakasu','to boil','godan','N4'],
  // ---- N4 · ichidan ----
  ['遅れる','おくれる','okureru','to be late','ichidan','N4'],
  ['落ちる','おちる','ochiru','to fall','ichidan','N4'],
  ['考える','かんがえる','kangaeru','to think','ichidan','N4'],
  ['決める','きめる','kimeru','to decide','ichidan','N4'],
  ['比べる','くらべる','kuraberu','to compare','ichidan','N4'],
  ['壊れる','こわれる','kowareru','to break (intr.)','ichidan','N4'],
  ['下げる','さげる','sageru','to lower','ichidan','N4'],
  ['調べる','しらべる','shiraberu','to investigate','ichidan','N4'],
  ['過ぎる','すぎる','sugiru','to pass / exceed','ichidan','N4'],
  ['捨てる','すてる','suteru','to throw away','ichidan','N4'],
  ['育てる','そだてる','sodateru','to raise','ichidan','N4'],
  ['倒れる','たおれる','taoreru','to fall down','ichidan','N4'],
  ['足りる','たりる','tariru','to be enough','ichidan','N4'],
  ['立てる','たてる','tateru','to stand (tr.)','ichidan','N4'],
  ['建てる','たてる','tateru','to build','ichidan','N4'],
  ['尋ねる','たずねる','tazuneru','to ask','ichidan','N4'],
  ['続ける','つづける','tsuづkeru','to continue (tr.)','ichidan','N4'],
  ['伝える','つたえる','tsutaeru','to convey','ichidan','N4'],
  ['付ける','つける','tsukeru','to attach','ichidan','N4'],
  ['連れる','つれる','tsureru','to take along','ichidan','N4'],
  ['勤める','つとめる','tsutomeru','to work for','ichidan','N4'],
  ['止める','とめる','tomeru','to stop (tr.)','ichidan','N4'],
  ['流れる','ながれる','nagareru','to flow','ichidan','N4'],
  ['投げる','なげる','nageru','to throw','ichidan','N4'],
  ['並べる','ならべる','naraberu','to arrange','ichidan','N4'],
  ['慣れる','なれる','nareru','to get used to','ichidan','N4'],
  ['逃げる','にげる','nigeru','to escape','ichidan','N4'],
  ['似る','にる','niru','to resemble','ichidan','N4'],
  ['濡れる','ぬれる','nureru','to get wet','ichidan','N4'],
  ['増える','ふえる','fueru','to increase','ichidan','N4'],
  ['負ける','まける','makeru','to lose','ichidan','N4'],
  ['迎える','むかえる','mukaeru','to welcome','ichidan','N4'],
  ['燃える','もえる','moeru','to burn','ichidan','N4'],
  ['痩せる','やせる','yaseru','to lose weight','ichidan','N4'],
  ['辞める','やめる','yameru','to quit','ichidan','N4'],
  ['汚れる','よごれる','yogoreru','to get dirty','ichidan','N4'],
  ['割れる','われる','wareru','to break (intr.)','ichidan','N4'],
  ['別れる','わかれる','wakareru','to part','ichidan','N4'],
  ['見える','みえる','mieru','to be visible','ichidan','N4'],
  ['見つける','みつける','mitsukeru','to find','ichidan','N4'],
  ['聞こえる','きこえる','kikoeru','to be audible','ichidan','N4'],
  ['間違える','まちがえる','machigaeru','to make a mistake','ichidan','N4'],
  ['生きる','いきる','ikiru','to live','ichidan','N4'],
  ['受ける','うける','ukeru','to receive / take','ichidan','N4'],
  ['売れる','うれる','ureru','to sell (intr.)','ichidan','N4'],
  ['離れる','はなれる','hanareru','to be apart','ichidan','N4'],
  ['乗り換える','のりかえる','norikaeru','to transfer','ichidan','N4'],
  ['集める','あつめる','atsumeru','to collect','ichidan','N4'],
  ['冷える','ひえる','hieru','to get cold','ichidan','N4'],
  ['知らせる','しらせる','shiraseru','to inform','ichidan','N4'],
  ['褒める','ほめる','homeru','to praise','ichidan','N4'],
  // ---- N4 · suru ----
  ['運転する','うんてんする','untensuru','to drive','suru','N4'],
  ['説明する','せつめいする','setsumeisuru','to explain','suru','N4'],
  ['予約する','よやくする','yoyakusuru','to reserve','suru','N4'],
  ['心配する','しんぱいする','shinpaisuru','to worry','suru','N4'],
  ['出発する','しゅっぱつする','shuppatsusuru','to depart','suru','N4'],
  ['紹介する','しょうかいする','shoukaisuru','to introduce','suru','N4'],
  ['案内する','あんないする','annaisuru','to guide','suru','N4'],
  ['研究する','けんきゅうする','kenkyuusuru','to research','suru','N4'],
  ['準備する','じゅんびする','jiゅnbisuru','to prepare','suru','N4'],
  ['留学する','りゅうがくする','riゅugakusuru','to study abroad','suru','N4'],
  ['連絡する','れんらくする','renrakusuru','to contact','suru','N4'],
  ['見物する','けんぶつする','kenbutsusuru','to sightsee','suru','N4'],
  ['遅刻する','ちこくする','chikokusuru','to be late','suru','N4'],
  ['運動する','うんどうする','undousuru','to exercise','suru','N4'],
  ['卒業する','そつぎょうする','sotsugiょusuru','to graduate','suru','N4'],
  ['入院する','にゅういんする','niゅuinsuru','to be hospitalized','suru','N4'],
  ['退院する','たいいんする','taiinsuru','to leave hospital','suru','N4'],
  ['故障する','こしょうする','koshousuru','to break down','suru','N4'],
  ['残業する','ざんぎょうする','zangiょusuru','to work overtime','suru','N4'],
  ['利用する','りようする','riyousuru','to use','suru','N4'],
  ['注意する','ちゅういする','chuuisuru','to be careful','suru','N4'],
  ['相談する','そうだんする','soudansuru','to consult','suru','N4'],
  ['参加する','さんかする','sankasuru','to participate','suru','N4'],
  ['約束する','やくそくする','yakusokusuru','to promise','suru','N4'],
  ['生活する','せいかつする','seikatsusuru','to live (life)','suru','N4'],
  ['招待する','しょうたいする','shoutaisuru','to invite','suru','N4'],
].map(([word, reading, romaji, meaning, group, level]) => ({ word, reading, romaji, meaning, group, level }));

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
  if (form === 'dictionary') return v.reading; // thể từ điển = chính cách đọc gốc (〜る, 〜く, 〜う...)
  if (v.group === 'suru') return (v.reading === 'する' ? '' : v.reading.slice(0, -2)) + ({ masu:'します',te:'して',ta:'した',nai:'しない',nakatta:'しなかった',potential:'できる',volitional:'しよう',imperative:'しろ',prohibitive:'するな',ba:'すれば',passive:'される',causative:'させる',causativePassive:'させられる' })[form];
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

/* Các thể mà kết quả chia ra là động từ thể từ điển (〜る).
   Vì đề bài cho ở thể ます nên đáp án cũng phải trả về thể ます (〜ます). */
const POLITE_ANSWER_FORMS = new Set(['potential', 'passive', 'causative', 'causativePassive']);

export function answerFor(v, form) {
  const base = conjugate(v, form);
  return POLITE_ANSWER_FORMS.has(form) ? base.replace(/る$/, 'ます') : base;
}

/* Những thể không tự nhiên / không dùng với một số động từ -> không đưa vào đề luyện tập.
   Khoá là cách đọc (reading) của động từ. */
const NO_TRAIN = ['potential', 'passive', 'causative', 'imperative', 'prohibitive'];
export const skipForms = {
  'ある': [...NO_TRAIN, 'volitional'],        // ある: không có thể khả năng, bị động, mệnh lệnh...
  'わかる': NO_TRAIN,                         // 分かる đã mang nghĩa "có thể hiểu"
  'みえる': NO_TRAIN,                         // 見える: tự nhiên "nhìn thấy được"
  'きこえる': NO_TRAIN,                       // 聞こえる: tự nhiên "nghe thấy được"
  'うまれる': NO_TRAIN,                       // 生まれる: bản thân đã là thể bị động
};
