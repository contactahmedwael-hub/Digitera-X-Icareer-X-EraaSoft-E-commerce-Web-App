"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, quantity, price, image }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={price}
          image={image}
          selectedOptions={selectedOptions}
          quantity={quantity}
          className="h-auto w-full flex-1 rounded bg-[#1a1a1a] py-4 text-[13px] font-bold uppercase text-white hover:bg-[#1a1a1a]/90"
        >
          Add to Cart / {formatWholePrice(price)}
        </AddToCartButton>
      )}
    />
  );
}
