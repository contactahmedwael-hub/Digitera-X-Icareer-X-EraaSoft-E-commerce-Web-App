import type { Metadata } from "next";
import { AuthGuard, SignupPage, authPaths } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create account | Odoratus",
  description: "Create your Odoratus account.",
};

export default function Page() {
  return (
    <AuthGuard requireSession={false} redirectTo={authPaths.account}>
      <SignupPage />
    </AuthGuard>
  );
}
