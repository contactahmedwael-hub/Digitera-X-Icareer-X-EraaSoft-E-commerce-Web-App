"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/features/auth/types/auth.types";

type AuthStore = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};

/**
 * The signed-in visitor, kept in browser storage so a refresh does not sign
 * them out. There is no backend in this build: nothing is verified and nothing
 * leaves the browser, but the session behaves the way a real one would.
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    {
      name: "odoratus-session",
      version: 1,
      // A password is never part of the session, so none is ever stored.
      partialize: ({ user }) => ({ user }),
    },
  ),
);
