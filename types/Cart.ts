export interface CartItemType {
  id: number;
  productID: number;
  userID: number;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
}

export interface CartState {
  cart: CartItemType[];
  // checkoutStatus: string;
  // isLoading: boolean;
}
