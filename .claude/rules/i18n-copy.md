# Rule: i18n / UI copy (vi + en)

Toàn bộ label, placeholder, toast, aria-label của một feature khai báo trong dictionary
`lib/i18n/{name}.dictionary.ts` — 1 type `{Name}Dictionary` + 2 object `vi`/`en` khớp type đó,
export `Record<Language, {Name}Dictionary>` tên `{name}Dictionary`. Field không phải chuỗi cố định
(cần nội suy số/biến) thì khai báo dạng hàm trong type, vd
`scheduleCountSuffix: (count: number) => string`.

Đọc dictionary qua hook riêng `use{Name}Copy.hook.ts` (`hooks/`) — pattern chuẩn:

```ts
export function use{Name}Copy() {
  const { language, setLocale } = useLocale(); // @/hooks/useLocale.hook
  return { ...{name}Dictionary[language], language, setLocale };
}
```

Component gọi `const copy = use{Name}Copy()` rồi dùng `copy.xxx` — không hardcode chuỗi hiển thị
trong JSX/toast. `Language`/`DEFAULT_LANGUAGE` khai báo ở `types/locale.types.ts`; locale hiện tại
lưu ở Redux (`lib/store/slices/locale.slice.ts`, đọc qua `useLocale`).

Xem `hooks/useClassFormCopy.hook.ts` + `lib/i18n/class-form.dictionary.ts` làm mẫu đầy đủ nhất
(nested theo step/section).

**Pattern cũ (lỗi thời)**: gom copy vào const `{name}ModalCopy`/`{name}PageCopy` trong
`{name}.data.ts`. Chỉ còn sót ở `components/practice-exams/` — feature mới **không** dùng lại
pattern đó. File `{name}.data.ts` giờ chỉ còn giữ hằng số miền dữ liệu không phải text hiển thị
(enum, màu, mapping) — xem `components/accounts/accounts.data.ts`.

**Ngoại lệ chưa dọn**: các trang "detail" nặng dữ liệu —
`components/classes/session-detail-page.tsx`, `components/sessions/session-detail-view.tsx`,
`components/classes/class-detail-watch-page.tsx` — hardcode thẳng chuỗi tiếng Việt trong JSX, không
qua dictionary lẫn `.data.ts`. Đây là nợ kỹ thuật có sẵn (không phải ngoại lệ được duyệt), **feature
mới không copy lại pattern này** — trang list/CRUD mới vẫn phải theo dictionary +
`use{Name}Copy.hook.ts` như mô tả ở trên. Chỉ giữ hardcode khi sửa tiếp chính 3 file này để nhất
quán với phần code xung quanh đã hardcode sẵn; đừng tự ý bọc dictionary cho chúng trừ khi được yêu
cầu (đổi 3 file cùng lúc để hỗ trợ `en` là việc lớn, không làm ngầm trong một task khác).
