"use client";

import { Button } from "@/components/ui/Button";
import type { CartLine } from "@/features/cart/types/cart.types";

type CartItemProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export function CartItem({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const options = Object.entries(line.selectedOptions)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-medium">{line.name}</h2>
        {options ? (
          <p className="text-sm text-zinc-600">{options}</p>
        ) : null}
        <p className="mt-1 text-sm">${line.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" onClick={() => onDecrement(line.id)}>
          -
        </Button>
        <span className="min-w-8 text-center text-sm">{line.quantity}</span>
        <Button variant="secondary" onClick={() => onIncrement(line.id)}>
          +
        </Button>
        <Button variant="ghost" onClick={() => onRemove(line.id)}>
          Remove
        </Button>
      </div>
    </article>
  );
}
