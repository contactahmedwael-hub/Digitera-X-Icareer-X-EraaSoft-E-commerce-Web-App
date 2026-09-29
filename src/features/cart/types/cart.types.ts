export type CartLineId = string;

export type AddToCartInput = {
  productId: string;
  /** The selected bottle size. */
  variantId: string;
  name: string;
  /** Display label for the selected size, e.g. "100 ml". */
  variantLabel: string;
  /** Price of the SELECTED variant, never the product's base price. */
  unitPrice: number;
  giftWrapping: boolean;
  image?: string;
  /** How many to add. Defaults to 1. */
  quantity?: number;
};

export type CartLine = Omit<AddToCartInput, "quantity"> & {
  id: CartLineId;
  quantity: number;
};
