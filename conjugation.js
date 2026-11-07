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
// [chữ Hán, cách đọc, romaji, nghĩa tiếng Việt, nhóm, cấp độ]
// 30 từ đầu tiên giữ nguyên thứ tự gốc (tests.mjs dùng find() lấy từ xuất hiện đầu tiên).
  ['書く','かく','kaku','viết','godan','N5'],
  ['話す','はなす','hanasu','nói chuyện','godan','N5'],
  ['飲む','のむ','nomu','uống','godan','N5'],
  ['遊ぶ','あそぶ','asobu','chơi','godan','N5'],
  ['読む','よむ','yomu','đọc','godan','N5'],
  ['待つ','まつ','matsu','đợi, chờ','godan','N5'],
  ['買う','かう','kau','mua','godan','N5'],
  ['泳ぐ','およぐ','oyogu','bơi','godan','N5'],
  ['死ぬ','しぬ','shinu','chết','godan','N4'],
  ['帰る','かえる','kaeru','về nhà','godan','N5'],
  ['走る','はしる','hashiru','chạy','godan','N4'],
  ['入る','はいる','hairu','vào','godan','N5'],
  ['行く','いく','iku','đi','godan','N5'],
  ['ある','ある','aru','có (đồ vật, sự việc)','godan','N5'],
  ['食べる','たべる','taberu','ăn','ichidan','N5'],
  ['見る','みる','miru','xem, nhìn','ichidan','N5'],
  ['寝る','ねる','neru','ngủ','ichidan','N5'],
  ['起きる','おきる','okiru','thức dậy','ichidan','N5'],
  ['借りる','かりる','kariru','mượn','ichidan','N5'],
  ['出る','でる','deru','ra, rời đi','ichidan','N5'],
  ['開ける','あける','akeru','mở (có tác nhân)','ichidan','N5'],
  ['閉める','しめる','shimeru','đóng (có tác nhân)','ichidan','N5'],
  ['作る','つくる','tsukuru','làm, chế tạo','godan','N5'],
  ['持つ','もつ','motsu','cầm, mang','godan','N5'],
  ['座る','すわる','suwaru','ngồi','godan','N5'],
  ['立つ','たつ','tatsu','đứng','godan','N5'],
  ['取る','とる','toru','lấy','godan','N5'],
  ['言う','いう','iu','nói','godan','N5'],
  ['する','する','suru','làm','suru','N5'],
  ['来る','くる','kuru','đến','kuru','N5'],
  // ---- N5 · godan ----
  ['会う','あう','au','gặp','godan','N5'],
  ['開く','あく','aku','mở (tự mở)','godan','N5'],
  ['洗う','あらう','arau','rửa','godan','N5'],
  ['歩く','あるく','aruku','đi bộ','godan','N5'],
  ['歌う','うたう','utau','hát','godan','N5'],
  ['売る','うる','uru','bán','godan','N5'],
  ['置く','おく','oku','đặt, để','godan','N5'],
  ['押す','おす','osu','đẩy, ấn','godan','N5'],
  ['終わる','おわる','owaru','kết thúc','godan','N5'],
  ['返す','かえす','kaesu','trả lại','godan','N5'],
  ['掛かる','かかる','kakaru','tốn (thời gian, tiền)','godan','N5'],
  ['貸す','かす','kasu','cho mượn','godan','N5'],
  ['被る','かぶる','kaburu','đội (mũ)','godan','N5'],
  ['消す','けす','kesu','tắt, xóa','godan','N5'],
  ['切る','きる','kiru','cắt','godan','N5'],
  ['聞く','きく','kiku','nghe, hỏi','godan','N5'],
  ['曲がる','まがる','magaru','rẽ','godan','N5'],
  ['出す','だす','dasu','đưa ra, nộp, gửi','godan','N5'],
  ['乗る','のる','noru','đi (xe), lên (xe)','godan','N5'],
  ['登る','のぼる','noboru','leo, trèo','godan','N5'],
  ['履く','はく','haku','mang (giày, quần)','godan','N5'],
  ['始まる','はじまる','hajimaru','bắt đầu (tự bắt đầu)','godan','N5'],
  ['働く','はたらく','hataraku','làm việc','godan','N5'],
  ['弾く','ひく','hiku','chơi (nhạc cụ)','godan','N5'],
  ['引く','ひく','hiku','kéo','godan','N5'],
  ['吹く','ふく','fuku','thổi','godan','N5'],
  ['降る','ふる','furu','rơi (mưa, tuyết)','godan','N5'],
  ['磨く','みがく','migaku','đánh (răng), mài bóng','godan','N5'],
  ['貰う','もらう','morau','nhận','godan','N5'],
  ['休む','やすむ','yasumu','nghỉ ngơi','godan','N5'],
  ['呼ぶ','よぶ','yobu','gọi','godan','N5'],
  ['分かる','わかる','wakaru','hiểu','godan','N5'],
  ['使う','つかう','tsukau','sử dụng','godan','N5'],
  ['着く','つく','tsuku','đến nơi','godan','N5'],
  ['知る','しる','shiru','biết','godan','N5'],
  ['住む','すむ','sumu','sống, ở','godan','N5'],
  ['違う','ちがう','chigau','khác, sai','godan','N5'],
  ['脱ぐ','ぬぐ','nugu','cởi','godan','N5'],
  ['成る','なる','naru','trở thành','godan','N5'],
  // ---- N5 · ichidan ----
  ['上げる','あげる','ageru','đưa lên, tặng','ichidan','N5'],
  ['浴びる','あびる','abiru','tắm (vòi sen)','ichidan','N5'],
  ['居る','いる','iru','có, ở (người, động vật)','ichidan','N5'],
  ['入れる','いれる','ireru','cho vào','ichidan','N5'],
  ['生まれる','うまれる','umareru','được sinh ra','ichidan','N5'],
  ['教える','おしえる','oshieru','dạy','ichidan','N5'],
  ['覚える','おぼえる','oboeru','nhớ, ghi nhớ','ichidan','N5'],
  ['降りる','おりる','oriru','xuống (xe)','ichidan','N5'],
  ['掛ける','かける','kakeru','treo, gọi (điện thoại)','ichidan','N5'],
  ['着る','きる','kiru','mặc','ichidan','N5'],
  ['出かける','でかける','dekakeru','ra ngoài','ichidan','N5'],
  ['見せる','みせる','miseru','cho xem','ichidan','N5'],
  ['疲れる','つかれる','tsukareru','mệt','ichidan','N5'],
  ['忘れる','わすれる','wasureru','quên','ichidan','N5'],
  // ---- N5 · suru ----
  ['勉強する','べんきょうする','benkyousuru','học','suru','N5'],
  ['結婚する','けっこんする','kekkonsuru','kết hôn','suru','N5'],
  ['散歩する','さんぽする','sanposuru','đi dạo','suru','N5'],
  ['洗濯する','せんたくする','sentakusuru','giặt giũ','suru','N5'],
  ['掃除する','そうじする','soujisuru','dọn dẹp','suru','N5'],
  ['旅行する','りょこうする','riょkousuru','du lịch','suru','N5'],
  ['電話する','でんわする','denwasuru','gọi điện thoại','suru','N5'],
  ['料理する','りょうりする','riょurisuru','nấu ăn','suru','N5'],
  ['練習する','れんしゅうする','renshuusuru','luyện tập','suru','N5'],
  ['質問する','しつもんする','shitsumonsuru','hỏi, đặt câu hỏi','suru','N5'],
  ['買い物する','かいものする','kaimonosuru','mua sắm','suru','N5'],
  // ---- N4 · godan ----
  ['上がる','あがる','agaru','đi lên, tăng lên','godan','N4'],
  ['集まる','あつまる','atsumaru','tập trung, tụ họp','godan','N4'],
  ['謝る','あやまる','ayamaru','xin lỗi','godan','N4'],
  ['急ぐ','いそぐ','isogu','vội, gấp','godan','N4'],
  ['動く','うごく','ugoku','chuyển động, cử động','godan','N4'],
  ['打つ','うつ','utsu','đánh, đập','godan','N4'],
  ['写す','うつす','utsusu','chụp ảnh, chép lại','godan','N4'],
  ['移る','うつる','utsuru','chuyển đến','godan','N4'],
  ['選ぶ','えらぶ','erabu','chọn','godan','N4'],
  ['送る','おくる','okuru','gửi, tiễn','godan','N4'],
  ['起こす','おこす','okosu','đánh thức, gây ra','godan','N4'],
  ['怒る','おこる','okoru','giận, nổi giận','godan','N4'],
  ['踊る','おどる','odoru','nhảy múa','godan','N4'],
  ['思う','おもう','omou','nghĩ, cho rằng','godan','N4'],
  ['思い出す','おもいだす','omoidasu','nhớ ra','godan','N4'],
  ['折る','おる','oru','gập, bẻ gãy','godan','N4'],
  ['変わる','かわる','kawaru','thay đổi','godan','N4'],
  ['決まる','きまる','kimaru','được quyết định','godan','N4'],
  ['咲く','さく','saku','nở (hoa)','godan','N4'],
  ['騒ぐ','さわぐ','sawagu','làm ồn','godan','N4'],
  ['触る','さわる','sawaru','sờ, chạm','godan','N4'],
  ['探す','さがす','sagasu','tìm kiếm','godan','N4'],
  ['下がる','さがる','sagaru','đi xuống, giảm','godan','N4'],
  ['閉まる','しまる','shimaru','đóng (tự đóng)','godan','N4'],
  ['進む','すすむ','susumu','tiến lên','godan','N4'],
  ['頼む','たのむ','tanomu','nhờ, yêu cầu','godan','N4'],
  ['足す','たす','tasu','thêm, cộng','godan','N4'],
  ['続く','つづく','tsuづku','tiếp tục (tự tiếp diễn)','godan','N4'],
  ['付く','つく','tsuku','được gắn vào, dính','godan','N4'],
  ['通る','とおる','tooru','đi qua','godan','N4'],
  ['止まる','とまる','tomaru','dừng (tự dừng)','godan','N4'],
  ['泊まる','とまる','tomaru','trọ lại qua đêm','godan','N4'],
  ['直す','なおす','naosu','sửa chữa','godan','N4'],
  ['治る','なおる','naoru','khỏi bệnh','godan','N4'],
  ['泣く','なく','naku','khóc','godan','N4'],
  ['無くなる','なくなる','nakunaru','hết, mất','godan','N4'],
  ['並ぶ','ならぶ','narabu','xếp hàng','godan','N4'],
  ['習う','ならう','narau','học (từ ai đó)','godan','N4'],
  ['盗む','ぬすむ','nusumu','ăn trộm','godan','N4'],
  ['塗る','ぬる','nuru','sơn, bôi','godan','N4'],
  ['眠る','ねむる','nemuru','ngủ','godan','N4'],
  ['運ぶ','はこぶ','hakobu','vận chuyển, mang','godan','N4'],
  ['払う','はらう','harau','trả tiền','godan','N4'],
  ['光る','ひかる','hikaru','tỏa sáng','godan','N4'],
  ['拾う','ひろう','hirou','nhặt','godan','N4'],
  ['踏む','ふむ','fumu','giẫm lên','godan','N4'],
  ['太る','ふとる','futoru','tăng cân','godan','N4'],
  ['勝つ','かつ','katsu','thắng','godan','N4'],
  ['間に合う','まにあう','maniau','kịp giờ','godan','N4'],
  ['守る','まもる','mamoru','bảo vệ, giữ (lời)','godan','N4'],
  ['迷う','まよう','mayou','lạc đường, phân vân','godan','N4'],
  ['回る','まわる','mawaru','quay, đi vòng','godan','N4'],
  ['向かう','むかう','mukau','hướng tới','godan','N4'],
  ['戻る','もどる','modoru','quay lại','godan','N4'],
  ['焼く','やく','yaku','nướng, đốt','godan','N4'],
  ['破る','やぶる','yaburu','xé, phá','godan','N4'],
  ['止む','やむ','yamu','tạnh (mưa)','godan','N4'],
  ['寄る','よる','yoru','ghé qua','godan','N4'],
  ['喜ぶ','よろこぶ','yorokobu','vui mừng','godan','N4'],
  ['笑う','わらう','warau','cười','godan','N4'],
  ['渡す','わたす','watasu','trao, đưa','godan','N4'],
  ['渡る','わたる','wataru','băng qua','godan','N4'],
  ['驚く','おどろく','odoroku','ngạc nhiên','godan','N4'],
  ['落とす','おとす','otosu','làm rơi','godan','N4'],
  ['当たる','あたる','ataru','trúng, đúng','godan','N4'],
  ['通う','かよう','kayou','đi lại đều đặn','godan','N4'],
  ['誘う','さそう','sasou','rủ, mời','godan','N4'],
  ['見つかる','みつかる','mitsukaru','được tìm thấy','godan','N4'],
  ['叱る','しかる','shikaru','mắng','godan','N4'],
  ['沸かす','わかす','wakasu','đun sôi','godan','N4'],
  // ---- N4 · ichidan ----
  ['遅れる','おくれる','okureru','trễ, muộn','ichidan','N4'],
  ['落ちる','おちる','ochiru','rơi, rớt','ichidan','N4'],
  ['考える','かんがえる','kangaeru','suy nghĩ','ichidan','N4'],
  ['決める','きめる','kimeru','quyết định','ichidan','N4'],
  ['比べる','くらべる','kuraberu','so sánh','ichidan','N4'],
  ['壊れる','こわれる','kowareru','bị hỏng','ichidan','N4'],
  ['下げる','さげる','sageru','hạ xuống','ichidan','N4'],
  ['調べる','しらべる','shiraberu','tìm hiểu, điều tra','ichidan','N4'],
  ['過ぎる','すぎる','sugiru','trôi qua, quá mức','ichidan','N4'],
  ['捨てる','すてる','suteru','vứt bỏ','ichidan','N4'],
  ['育てる','そだてる','sodateru','nuôi dưỡng','ichidan','N4'],
  ['倒れる','たおれる','taoreru','ngã, đổ','ichidan','N4'],
  ['足りる','たりる','tariru','đủ','ichidan','N4'],
  ['立てる','たてる','tateru','dựng lên','ichidan','N4'],
  ['建てる','たてる','tateru','xây dựng','ichidan','N4'],
  ['尋ねる','たずねる','tazuneru','hỏi thăm','ichidan','N4'],
  ['続ける','つづける','tsuづkeru','tiếp tục (có chủ ý)','ichidan','N4'],
  ['伝える','つたえる','tsutaeru','truyền đạt','ichidan','N4'],
  ['付ける','つける','tsukeru','gắn vào, bật','ichidan','N4'],
  ['連れる','つれる','tsureru','dẫn theo','ichidan','N4'],
  ['勤める','つとめる','tsutomeru','làm việc (cho công ty)','ichidan','N4'],
  ['止める','とめる','tomeru','dừng (có tác nhân)','ichidan','N4'],
  ['流れる','ながれる','nagareru','chảy','ichidan','N4'],
  ['投げる','なげる','nageru','ném','ichidan','N4'],
  ['並べる','ならべる','naraberu','xếp, bày','ichidan','N4'],
  ['慣れる','なれる','nareru','quen','ichidan','N4'],
  ['逃げる','にげる','nigeru','chạy trốn','ichidan','N4'],
  ['似る','にる','niru','giống','ichidan','N4'],
  ['濡れる','ぬれる','nureru','bị ướt','ichidan','N4'],
  ['増える','ふえる','fueru','tăng lên','ichidan','N4'],
  ['負ける','まける','makeru','thua','ichidan','N4'],
  ['迎える','むかえる','mukaeru','đón','ichidan','N4'],
  ['燃える','もえる','moeru','cháy','ichidan','N4'],
  ['痩せる','やせる','yaseru','gầy đi','ichidan','N4'],
  ['辞める','やめる','yameru','nghỉ việc, bỏ','ichidan','N4'],
  ['汚れる','よごれる','yogoreru','bị bẩn','ichidan','N4'],
  ['割れる','われる','wareru','vỡ','ichidan','N4'],
  ['別れる','わかれる','wakareru','chia tay','ichidan','N4'],
  ['見える','みえる','mieru','nhìn thấy được','ichidan','N4'],
  ['見つける','みつける','mitsukeru','tìm thấy','ichidan','N4'],
  ['聞こえる','きこえる','kikoeru','nghe thấy được','ichidan','N4'],
  ['間違える','まちがえる','machigaeru','nhầm lẫn','ichidan','N4'],
  ['生きる','いきる','ikiru','sống','ichidan','N4'],
  ['受ける','うける','ukeru','nhận, dự (thi)','ichidan','N4'],
  ['売れる','うれる','ureru','bán chạy','ichidan','N4'],
  ['離れる','はなれる','hanareru','rời xa','ichidan','N4'],
  ['乗り換える','のりかえる','norikaeru','đổi tàu xe','ichidan','N4'],
  ['集める','あつめる','atsumeru','thu thập','ichidan','N4'],
  ['冷える','ひえる','hieru','lạnh đi','ichidan','N4'],
  ['知らせる','しらせる','shiraseru','thông báo','ichidan','N4'],
  ['褒める','ほめる','homeru','khen','ichidan','N4'],
  // ---- N4 · suru ----
  ['運転する','うんてんする','untensuru','lái xe','suru','N4'],
  ['説明する','せつめいする','setsumeisuru','giải thích','suru','N4'],
  ['予約する','よやくする','yoyakusuru','đặt trước','suru','N4'],
  ['心配する','しんぱいする','shinpaisuru','lo lắng','suru','N4'],
  ['出発する','しゅっぱつする','shuppatsusuru','xuất phát','suru','N4'],
  ['紹介する','しょうかいする','shoukaisuru','giới thiệu','suru','N4'],
  ['案内する','あんないする','annaisuru','hướng dẫn','suru','N4'],
  ['研究する','けんきゅうする','kenkyuusuru','nghiên cứu','suru','N4'],
  ['準備する','じゅんびする','jiゅnbisuru','chuẩn bị','suru','N4'],
  ['留学する','りゅうがくする','riゅugakusuru','du học','suru','N4'],
  ['連絡する','れんらくする','renrakusuru','liên lạc','suru','N4'],
  ['見物する','けんぶつする','kenbutsusuru','tham quan','suru','N4'],
  ['遅刻する','ちこくする','chikokusuru','đi muộn','suru','N4'],
  ['運動する','うんどうする','undousuru','vận động, tập thể dục','suru','N4'],
  ['卒業する','そつぎょうする','sotsugiょusuru','tốt nghiệp','suru','N4'],
  ['入院する','にゅういんする','niゅuinsuru','nhập viện','suru','N4'],
  ['退院する','たいいんする','taiinsuru','xuất viện','suru','N4'],
  ['故障する','こしょうする','koshousuru','hỏng hóc','suru','N4'],
  ['残業する','ざんぎょうする','zangiょusuru','làm thêm giờ','suru','N4'],
  ['利用する','りようする','riyousuru','sử dụng','suru','N4'],
  ['注意する','ちゅういする','chuuisuru','chú ý','suru','N4'],
  ['相談する','そうだんする','soudansuru','bàn bạc, tư vấn','suru','N4'],
  ['参加する','さんかする','sankasuru','tham gia','suru','N4'],
  ['約束する','やくそくする','yakusokusuru','hứa hẹn','suru','N4'],
  ['生活する','せいかつする','seikatsusuru','sinh sống','suru','N4'],
  ['招待する','しょうたいする','shoutaisuru','mời','suru','N4'],
].map(([word, reading, romaji, meaning, group, level]) => ({ word, reading, romaji, meaning, group, level }));

export const kana = {
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
