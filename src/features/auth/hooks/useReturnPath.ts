"use client";

import { useSearchParams } from "next/navigation";
import { authPaths } from "@/features/auth/paths";
import {
  RETURN_PARAM,
  sanitiseReturnPath,
} from "@/features/auth/utils/return-to";

/**
 * Where to go once signed in: back where the visitor was heading, or the
 * account page when they came to the form directly.
 */
export function useReturnPath(): string {
  const params = useSearchParams();
  return sanitiseReturnPath(params.get(RETURN_PARAM)) ?? authPaths.account;
}
