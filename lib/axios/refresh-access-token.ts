import { postAuthRefresh } from "@/lib/axios/auth-refresh";
import { setAuthTokens as saveAuthTokens } from "@/lib/axios/auth-storage";
import { useAuthStore } from "@/zustand/auth.store";

let refreshInFlight: Promise<boolean> | null = null;

export const performRefresh = async (): Promise<boolean> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    useAuthStore.getState().clearAuth();
    return false;
  }
  try {
    const tokens = await postAuthRefresh(refreshToken);
    useAuthStore.getState().setCredentials({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
    saveAuthTokens(tokens.accessToken, tokens.refreshToken);
    return true;
  } catch {
    useAuthStore.getState().clearAuth();
    return false;
  }
};

/** Một phiên refresh dùng chung cho mọi request 401 đồng thời. */
export const refreshAccessTokenViaStore = (): Promise<boolean> => {
  if (!refreshInFlight) {
    refreshInFlight = performRefresh().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};
