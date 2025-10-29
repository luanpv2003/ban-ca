import { kv } from '@vercel/kv';
import { Product } from './types';

// Vercel KV key patterns:
// - products:list -> Set of product IDs
// - product:{id} -> Product object

const PRODUCTS_LIST_KEY = 'products:list';
const getProductKey = (id: string) => `product:${id}`;

export async function getAllProducts(): Promise<Product[]> {
  try {
    // Get all product IDs from the set
    const productIds = await kv.smembers(PRODUCTS_LIST_KEY) as string[];
    
    if (!productIds || productIds.length === 0) {
      return [];
    }

    // Fetch all products
    const products = await Promise.all(
      productIds.map(async (id) => {
        const product = await kv.get<Product>(getProductKey(id));
        return product;
      })
    );

    // Filter out null values and sort by createdAt (newest first)
    return products
      .filter((p): p is Product => p !== null)
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await kv.get<Product>(getProductKey(id));
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function createProduct(
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
  const id = crypto.randomUUID();
  const now = Date.now();
  
  const product: Product = {
    id,
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  try {
    // Save product
    await kv.set(getProductKey(id), product);
    
    // Add product ID to the set
    await kv.sadd(PRODUCTS_LIST_KEY, id);
    
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Product | null> {
  try {
    const existingProduct = await getProductById(id);
    
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: Product = {
      ...existingProduct,
      ...data,
      updatedAt: Date.now(),
    };

    await kv.set(getProductKey(id), updatedProduct);
    
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const product = await getProductById(id);
    
    if (!product) {
      return false;
    }

    // Remove product
    await kv.del(getProductKey(id));
    
    // Remove product ID from the set
    await kv.srem(PRODUCTS_LIST_KEY, id);
    
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw new Error('Failed to delete product');
  }
}
