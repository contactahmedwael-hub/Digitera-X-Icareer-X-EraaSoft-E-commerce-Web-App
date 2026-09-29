"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SubmitStatus } from "@/features/auth/types/auth.types";

const SIMULATED_LATENCY_MS = 700;

/**
 * There is no backend in this build, so this stands in for the network
 * round-trip: the button, the live region and the redirect all behave exactly
 * as they would against a real endpoint.
 *
 * The completion callback is passed to `submit` rather than to the hook, so it
 * closes over the values as they were when the form was actually submitted.
 */
export function useAuthSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const submit = useCallback((onSettled: () => void) => {
    setStatus("submitting");
    timerRef.current = setTimeout(() => {
      setStatus("success");
      onSettled();
    }, SIMULATED_LATENCY_MS);
  }, []);

  return { status, submit };
}
