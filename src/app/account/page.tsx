import type { Metadata } from "next";
import { AccountPage, AuthGuard } from "@/features/auth";

export const metadata: Metadata = {
  title: "Your account | Odoratus",
  description: "Your Odoratus account details.",
};

export default function Page() {
  return (
    // Signing out unmounts the page, and the guard is what sends the visitor
    // home — so this is also where a signed-out direct visit lands.
    <AuthGuard requireSession redirectTo="/">
      <AccountPage />
    </AuthGuard>
  );
}
