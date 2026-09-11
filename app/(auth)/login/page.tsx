import { LoginForm } from "@/components/auth/login-form";
import { AuthScreen } from "@/components/auth/auth-ui";
import { LoginTopRight } from "@/components/auth/auth-top-right";
import { redirectIfAuthenticated } from "@/lib/axios/auth-redirect";

export const metadata = {
  title: "Đăng nhập | Gia Sư Pro",
  description: "Đăng nhập để quản lý lớp học và học sinh",
};

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <AuthScreen topRight={<LoginTopRight />}>
      <LoginForm />
    </AuthScreen>
  );
}
