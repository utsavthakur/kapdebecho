export interface ProductSize {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  tailorId: string;
  name: string;
  description: string;
  type: string;
  sizes: ProductSize[];
  images: string[];
  available: boolean;
  createdAt: string;
}
