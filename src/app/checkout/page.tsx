import type { Metadata } from "next";
import { AuthGuard, authPaths } from "@/features/auth";
import { CheckoutPage } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Checkout | Odoratus",
  description: "Complete your Odoratus order.",
};

export default function Page() {
  return (
    <AuthGuard requireSession rememberReturn redirectTo={authPaths.login}>
      <CheckoutPage />
    </AuthGuard>
  );
}
