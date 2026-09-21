import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Minimal HTTP helper for feature services.
 * There is no backend yet — this is used only when mock data is disabled.
 */
export async function apiGet<T>(path: string): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not set. Enable mock data or provide an API base URL.",
    );
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
