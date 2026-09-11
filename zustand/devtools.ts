/**
 * Tên connection dùng chung cho Redux DevTools Extension. Mọi store trong
 * `zustand/*.store.ts` phải truyền đúng tên này vào option `name` của
 * `devtools()` — cùng `name` + khác `store` sẽ gộp chung MỘT connection,
 * mỗi store hiện dưới một key riêng (`state.auth`, `state.locale`,
 * `state.global`), giống cách `combineReducers` cũ hiện cả cây state trong
 * MỘT tab của Redux DevTools thay vì tách thành nhiều instance rời rạc (dễ bị
 * bỏ sót vì phải bấm dropdown chọn instance).
 */
export const DEVTOOLS_CONNECTION_NAME = "TutorManagement";
