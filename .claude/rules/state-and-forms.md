# Rule: State management & forms (FE)

- **State**: client state (auth/UI) qua Redux Toolkit + Redux Persist, đọc bằng hook có type
  `useAppSelector`/`useAppDispatch` (`@/lib/store/hooks`). Server state qua TanStack Query — dùng
  wrapper `useGet`/`usePost`/`usePut`/`useDelete` (xem [[api-integration]]), không gọi
  `useQuery`/`useMutation` thô hay `axiosInstance` trực tiếp trong component.
- **Form & validation**: React Hook Form + **Zod v4** (`@hookform/resolvers`). Lỗi form xử lý qua
  `@/lib/axios/form-error`. Giữ field/ràng buộc khớp với schema Zod bên BE (xem [[api-integration]]).
- **Redux slice**: mỗi slice (`lib/store/slices/{name}.slice.ts`) export **cả** named reducer
  (`export const {name}Reducer = {name}Slice.reducer`) **lẫn** `export default` — action creators
  export named như hiện tại. `lib/store/slices/index.ts` là barrel (`export * from "./{name}.slice"`)
  gom tất cả slice; `store.ts` import reducer qua barrel (`import { authReducer, globalReducer } from
  "@/lib/store/slices"`), không import thẳng file `.slice.ts` cho slice mới. Slice mới thêm phải được
  wire vào `combineReducers` trong `lib/store/store.ts`; chỉ bọc `persistReducer` (với
  `whitelist`) cho slice cần tồn tại qua reload (vd `auth`, `locale`) — slice UI thuần (vd `global`)
  để nguyên không persist trừ khi có yêu cầu rõ.
