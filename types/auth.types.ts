export type Role = "admin" | "student" | "parent";
export type ApiRole = "STUDENT" | "PARENT";
export type LoginPayload =
  | { email: string; password: string }
  | { userCode: string; password: string; role: ApiRole };

export const resolveLoginUrl = (payload: LoginPayload) =>
  "userCode" in payload ? "/auth/login/user-code" : "/auth/login";

export type LoginFormValues = {
  email: string;
  identifier: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponse = {
  accessToken?: string;
  access_token?: string;
  token?: string;
  refreshToken?: string;
  refresh_token?: string | null;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
};

export type ForgotPasswordPayload = { email: string };
export type ForgotPasswordResponse = { ok: boolean };

export type ResetPasswordPayload = {
  jti: string;
  password: string;
  confirmPassword: string;
};
export type ResetPasswordResponse = { ok: boolean };
