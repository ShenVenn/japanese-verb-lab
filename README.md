# Verb Lab

A zero-dependency Japanese verb conjugation practice app inspired by the learning flow of the referenced JapaneseJLPT page.

## Run it

Open `index.html` in a modern browser. No installation or server is required.

## Verify the conjugation engine

With Node.js installed, run:

```powershell
node tests.mjs
```

The app supports 13 forms across Godan, Ichidan, する, and 来る verbs, including the key 行く and ある exceptions. It accepts answers in kana or simplified romaji.

## Thống kê

Tab **Thống kê** lưu kết quả từng câu vào `localStorage` của trình duyệt (khóa `verbLabStats`, chỉ vài KB): tổng số câu, độ chính xác, ngày liên tiếp, biểu đồ 7 ngày, độ chính xác theo từng thể và các động từ hay sai. Có nút xóa thống kê (bấm 2 lần để xác nhận).

## Giải thích câu sai

Ở màn kết quả, mỗi câu sai có dấu chấm than trắng trong vòng tròn đỏ hồng. Rê chuột (hoặc chạm/nhấn) để xem nguyên nhân sai, quy tắc chia, nhóm động từ và nghĩa tiếng Việt. Nghĩa tiếng Việt nằm ở cột thứ 4 của mảng `verbs` trong `conjugation.js`.

## Trang chủ "Ga tàu"

Khi mở web sẽ thấy trang chủ với 2 lựa chọn: **Chia thể động từ** và **Kiểm tra từ vựng**. Bấm logo ở góc trái để quay về trang chủ.

## Ngẫu nhiên thể

Ở khung "Chọn thể cần chia" bấm nút **Ngẫu nhiên** để hiện hàng số 2 · 3 · 4 · 5 · 6, bấm một số để chọn ngẫu nhiên đúng chừng đó thể (bấm lại để xáo lại). Thể ます không nằm trong nhóm bốc thăm vì đề đã cho sẵn thể này.

## Kiểm tra từ vựng

Chọn bảng từ (N5, N4, tất cả), số lượt (10 / 20 / 30 hoặc tự nhập 1–200) và cách hiện kết quả (hiện ngay sau mỗi câu, hoặc hết lượt mới hiện). Đề hiện nghĩa tiếng Việt, bạn gõ cách đọc bằng hiragana (gõ romaji sẽ tự đổi, `sensei` → せんせい). Từ katakana gõ hiragana hay katakana đều được, ー và nguyên âm kéo dài được coi là giống nhau.

- Từ vựng nằm trong `vocab.js` (danh từ, tính từ, phó từ); động từ lấy từ `conjugation.js`. Thêm từ mới bằng cách thêm một dòng `[chữ Hán, cách đọc, nghĩa, loại từ, cấp độ]`.
- Cấp độ N5/N4 chỉ mang tính tương đối vì JLPT không có danh sách từ chính thức.
- Kết quả kiểm tra từ vựng chưa được tính vào tab Thống kê.

Lưu ý: vì dùng ES module, hãy mở web qua một server (ví dụ `python -m http.server`) hoặc đăng lên GitHub Pages; mở thẳng file `index.html` bằng `file://` có thể bị trình duyệt chặn.

### Trang chủ kiểu ga tàu (`home.js`, `home.css`)

- 13 thể chia là 13 "ga" trên một tuyến. Bảng giờ tàu kiểu bảng lật chữ tự chạy qua từng ga và hiện đáp án thật (dùng chính bộ chia động từ của app). Chạm vào một ga để xem ngay thể đó; chạm xong bảng sẽ giữ yên khoảng 7 giây.
- Chỉ trang chủ dùng nền "nhà ga" (bê tông, gạch vàng dẫn đường, bảng LED). Các trang còn lại vẫn dùng nền ảnh như cũ, và ba chế độ giao diện (sáng, tối, tối giản buổi đêm) đều có bản của riêng trang chủ.
- Muốn đổi danh sách động từ chạy trên bảng, sửa mảng `SHOW` trong `home.js` (mỗi động từ tối đa 8 ký tự kana ở mọi thể).
- Font: Bricolage Grotesque (tiêu đề) và DotGothic16 (bảng chữ chấm) nạp từ Google Fonts; khi offline sẽ dùng font hệ thống.

### Trang chia thể kiểu "Ga tàu" và kiểu "Cổ điển"

- Mặc định trang **Chia thể** dùng thiết kế ga tàu giống trang chủ: ba biển ga (cấp độ, thể, số câu), bảng vé LED tóm tắt lựa chọn, ô số câu như ô lật chữ, nút vàng và gạch dẫn đường.
- Muốn dùng kiểu cũ (ảnh nền, hoa anh đào): **Cài đặt, mục "Kiểu trang chia thể", chọn "Cổ điển (kiểu cũ)"**. Lựa chọn được lưu trong trình duyệt.
- Kiểu ga tàu chỉ áp dụng cho trang thiết lập chia thể; trang kiểm tra từ vựng và màn hình làm bài giữ nguyên.
