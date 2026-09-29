"use client";

import { useSyncExternalStore } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";

function subscribe(onChange: () => void) {
  return useAuthStore.persist.onFinishHydration(onChange);
}

/**
 * The session is restored from browser storage after the first paint. Anything
 * that renders differently for a signed-in visitor must wait for this, or the
 * server and client markup disagree on the very first frame.
 */
export function useSessionHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => useAuthStore.persist.hasHydrated(),
    () => false,
  );
}

export function useSession() {
  const stored = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);
  const hydrated = useSessionHydrated();

  // Before hydration, render as signed out — that is what the server sent.
  const user = hydrated ? stored : null;

  return { user, isSignedIn: Boolean(user), hydrated, signIn, signOut };
}
