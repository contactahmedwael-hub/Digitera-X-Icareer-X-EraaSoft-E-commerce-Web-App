/**
 * Public environment configuration.
 * Do not store secrets in NEXT_PUBLIC_* variables — they are exposed to the browser.
 */
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "",
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API !== "false",
};
