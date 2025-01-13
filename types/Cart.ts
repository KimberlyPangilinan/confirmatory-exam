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
  address: string;
  total: number;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  deliveryMethod: string;
  deliveryInstructions: string;
  changeFor: number;
  status?: string;
  orderAt?: Date;
  createdAt?: Date;
}

type BillingDetails = {
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
  billingDetails: BillingDetails;
};
