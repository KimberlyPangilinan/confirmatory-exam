export interface CartItemType {
  id: number;
  productID: number;
  productName: string;
  price: number;
  image: string;
  quantity: number;
  variations: any;
}
export interface Cart {
  id: number;
  cart: CartItemType[];
  userId: number;
  address: Address;
  total: number;
  shippingFee?: number;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  deliveryMethod: string;
  deliveryInstructions: string;
  changeFor: number;
  status?: string;
  orderAt?: Date;
  createdAt?: Date;
}

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

type PaymentDetails = {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  billingDetails: Address;
};
