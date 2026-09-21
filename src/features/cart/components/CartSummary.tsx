type CartSummaryProps = {
  total: number;
  quantity: number;
};

export function CartSummary({ total, quantity }: CartSummaryProps) {
  return (
    <aside className="rounded-lg border border-zinc-200 bg-white p-4">
      <h2 className="font-medium">Summary</h2>
      <p className="mt-2 text-sm text-zinc-600">{quantity} item(s)</p>
      <p className="mt-4 text-xl font-semibold">${total.toFixed(2)}</p>
    </aside>
  );
}
