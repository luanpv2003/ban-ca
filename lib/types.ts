export interface Product {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  imageUrl: string; // Main image (first image in imageUrls)
  imageUrls: string[]; // Array of all images
  createdAt: number;
  updatedAt: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  originalPrice: string;
  salePrice: string;
  imageUrls: string[]; // Changed from imageUrl to imageUrls
}
