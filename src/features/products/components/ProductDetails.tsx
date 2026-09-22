import type { Product } from "@/features/products/types/product.types";
import {
  formatWholePrice,
  getOccasionLabel,
  getScentFamilyLabel,
} from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  price?: number;
};

/** US-04: product information. */
export function ProductDetails({ product, price }: ProductDetailsProps) {
  const displayPrice = price ?? product.price;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[11px] font-semibold uppercase">
          Scent Family: {getScentFamilyLabel(product.scentFamily)}
        </span>
        <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase text-[#605a54]">
          Occasion: {getOccasionLabel(product.occasion)}
        </span>
      </div>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-tight text-[#1a1a1a] sm:text-[48px]">
        {product.name}
      </h1>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[24px] font-semibold">{formatWholePrice(displayPrice)}</p>
        {product.availableInAtelier ? (
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#10b981]">
            <span className="size-2 rounded-full bg-[#10b981]" />
            Available in Atelier
          </p>
        ) : null}
      </div>
    </div>
  );
}
