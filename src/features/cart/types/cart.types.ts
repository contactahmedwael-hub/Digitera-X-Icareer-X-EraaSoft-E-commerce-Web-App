export type CartLineId = string;

export type AddToCartInput = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  selectedOptions: Record<string, string>;
};

export type CartLine = AddToCartInput & {
  id: CartLineId;
  quantity: number;
};
