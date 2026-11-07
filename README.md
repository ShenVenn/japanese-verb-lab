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
