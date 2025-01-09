export interface CartItemType {
  id: number;
  productID: number;
  userId: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartState {
  cart: CartItemType[];
}
