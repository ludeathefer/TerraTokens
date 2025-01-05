import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  sessionToken: string | null;
  userPublicKey: string | null;
  setAuth: (token: string, publicKey: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      sessionToken: null,
      userPublicKey: null,
      setAuth: (token, publicKey) =>
        set({
          sessionToken: token,
          userPublicKey: publicKey,
        }),
      clearAuth: () =>
        set({
          sessionToken: null,
          userPublicKey: null,
        }),
      isAuthenticated: () => !!get().sessionToken,
    }),
    {
      name: "auth-storage",
    }
  )
);
