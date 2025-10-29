export interface Product {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
  features?: string[];
  createdAt: number;
  updatedAt: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  imageUrl: string;
  features: string[];
}
