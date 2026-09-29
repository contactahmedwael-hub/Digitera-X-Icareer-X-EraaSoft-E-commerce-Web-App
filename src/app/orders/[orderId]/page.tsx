import type { Metadata } from "next";
import { AuthGuard, authPaths } from "@/features/auth";
import { OrderConfirmation } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Your order | Odoratus",
  description: "Your Odoratus order confirmation.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <AuthGuard requireSession rememberReturn redirectTo={authPaths.login}>
      <OrderConfirmation orderId={decodeURIComponent(orderId)} />
    </AuthGuard>
  );
}
