'use server';

import { createProduct, updateProduct, deleteProduct } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProductAction(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const originalPrice = parseFloat(formData.get('originalPrice') as string);
    const salePrice = parseFloat(formData.get('salePrice') as string);
    const imageUrl = formData.get('imageUrl') as string;
    const featuresJson = formData.get('features') as string;
    
    // Parse features
    let features: string[] = [];
    if (featuresJson) {
      try {
        features = JSON.parse(featuresJson);
        // Filter out empty strings
        features = features.filter(f => f.trim() !== '');
      } catch (e) {
        console.error('Error parsing features:', e);
      }
    }

    // Validation
    if (!title || !description || !imageUrl) {
      return { success: false, error: 'Vui lòng điền đầy đủ thông tin' };
    }

    if (isNaN(originalPrice) || isNaN(salePrice)) {
      return { success: false, error: 'Giá không hợp lệ' };
    }

    if (salePrice > originalPrice) {
      return { success: false, error: 'Giá bán không được lớn hơn giá gốc' };
    }

    if (originalPrice <= 0 || salePrice <= 0) {
      return { success: false, error: 'Giá phải lớn hơn 0' };
    }

    const product = await createProduct({
      title,
      description,
      originalPrice,
      salePrice,
      imageUrl,
      features: features.length > 0 ? features : undefined,
    });

    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, productId: product.id };
  } catch (error) {
    console.error('Error in createProductAction:', error);
    return { success: false, error: 'Có lỗi xảy ra khi tạo sản phẩm' };
  }
}

export async function updateProductAction(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const originalPrice = parseFloat(formData.get('originalPrice') as string);
    const salePrice = parseFloat(formData.get('salePrice') as string);
    const imageUrl = formData.get('imageUrl') as string;
    const featuresJson = formData.get('features') as string;
    
    // Parse features
    let features: string[] = [];
    if (featuresJson) {
      try {
        features = JSON.parse(featuresJson);
        // Filter out empty strings
        features = features.filter(f => f.trim() !== '');
      } catch (e) {
        console.error('Error parsing features:', e);
      }
    }

    // Validation
    if (!title || !description || !imageUrl) {
      return { success: false, error: 'Vui lòng điền đầy đủ thông tin' };
    }

    if (isNaN(originalPrice) || isNaN(salePrice)) {
      return { success: false, error: 'Giá không hợp lệ' };
    }

    if (salePrice > originalPrice) {
      return { success: false, error: 'Giá bán không được lớn hơn giá gốc' };
    }

    if (originalPrice <= 0 || salePrice <= 0) {
      return { success: false, error: 'Giá phải lớn hơn 0' };
    }

    const product = await updateProduct(id, {
      title,
      description,
      originalPrice,
      salePrice,
      imageUrl,
      features: features.length > 0 ? features : undefined,
    });

    if (!product) {
      return { success: false, error: 'Không tìm thấy sản phẩm' };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath(`/products/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error in updateProductAction:', error);
    return { success: false, error: 'Có lỗi xảy ra khi cập nhật sản phẩm' };
  }
}

export async function deleteProductAction(id: string) {
  try {
    const success = await deleteProduct(id);

    if (!success) {
      return { success: false, error: 'Không tìm thấy sản phẩm' };
    }

    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true };
  } catch (error) {
    console.error('Error in deleteProductAction:', error);
    return { success: false, error: 'Có lỗi xảy ra khi xóa sản phẩm' };
  }
}
