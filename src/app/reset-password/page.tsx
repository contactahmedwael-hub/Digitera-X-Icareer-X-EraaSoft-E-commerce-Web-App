import type { Metadata } from "next";
import { AuthGuard, ResetPasswordPage, authPaths } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset your password | Odoratus",
  description: "Set a new password for your Odoratus account.",
};

export default function Page() {
  return (
    <AuthGuard requireSession={false} redirectTo={authPaths.account}>
      <ResetPasswordPage />
    </AuthGuard>
  );
}
