import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** Redirect authenticated users away from auth pages (login, forgot, OTP, …). */
export async function redirectIfAuthenticated(destination = "/") {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("access_token")?.value ||
    cookieStore.get("accessToken")?.value;

  if (token) {
    redirect(destination);
  }
}
