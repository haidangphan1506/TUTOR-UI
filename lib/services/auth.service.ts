import { usePost } from "@/lib/axios/query";
import { resolveLoginUrl } from "@/types/auth.types";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/types/auth.types";

/**
 * BE (`AuthController`) only exposes register / login / login-user-code /
 * refresh / forgot-password / reset-password / OAuth — there is no OTP step.
 * `forgot-password` emails a reset link carrying the token directly consumed
 * by `reset-password` as `jti`.
 */
export function useAuthActions() {
  const login = usePost<LoginResponse, LoginPayload>(resolveLoginUrl);
  const register = usePost<RegisterResponse, RegisterPayload>(
    "/auth/register",
  );
  const forgotPassword = usePost<ForgotPasswordResponse, ForgotPasswordPayload>(
    "/auth/forgot-password",
  );
  const resetPassword = usePost<ResetPasswordResponse, ResetPasswordPayload>(
    "/auth/reset-password",
  );

  return { login, register, forgotPassword, resetPassword };
}
