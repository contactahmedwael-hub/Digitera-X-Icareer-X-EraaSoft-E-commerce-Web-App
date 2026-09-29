import type { Metadata } from "next";
import { AuthGuard, LoginPage, authPaths } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in | Odoratus",
  description: "Sign in to your Odoratus account.",
};

export default function Page() {
  return (
    <AuthGuard requireSession={false} redirectTo={authPaths.account}>
      <LoginPage />
    </AuthGuard>
  );
}
