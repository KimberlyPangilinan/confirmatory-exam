export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: any;
}

export interface ProductState {
  products: ProductType[];
  isLoading: boolean;
}
