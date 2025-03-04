import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  jwt: string | null;
  userPublicKey: string | null;
  setAuth: (token: string, publicKey: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      jwt: null,
      userPublicKey: null,
      setAuth: (token, publicKey) =>
        set({
          jwt: token,
          userPublicKey: publicKey,
        }),
      clearAuth: () =>
        set({
          jwt: null,
          userPublicKey: null,
        }),
      isAuthenticated: () => !!get().jwt,
    }),
    {
      name: "auth-storage",
    }
  )
);
