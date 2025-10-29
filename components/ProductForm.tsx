'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import { Product } from '@/lib/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string; productId?: string }>;
}

export default function ProductForm({ product, onSubmit }: ProductFormProps) {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>(product?.imageUrls || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (imageUrls.length === 0) {
      setError('Vui lòng upload ít nhất 1 hình ảnh sản phẩm');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('imageUrls', JSON.stringify(imageUrls));

    try {
      const result = await onSubmit(formData);

      if (result.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(result.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Có lỗi xảy ra khi gửi form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div 
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm" 
          role="alert"
          aria-live="polite"
        >
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      <ImageUpload value={imageUrls} onChange={setImageUrls} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Tên sản phẩm *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={product?.title}
          required
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="VD: Cá Lóc Khô 500g"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-2">
            Giá gốc (VNĐ) *
          </label>
          <input
            type="number"
            id="originalPrice"
            name="originalPrice"
            defaultValue={product?.originalPrice}
            required
            min="0"
            step="1000"
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="150000"
          />
        </div>

        <div>
          <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-2">
            Giá bán (VNĐ) *
          </label>
          <input
            type="number"
            id="salePrice"
            name="salePrice"
            defaultValue={product?.salePrice}
            required
            min="0"
            step="1000"
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="120000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả sản phẩm *
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={8}
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Mô tả chi tiết về sản phẩm, nguồn gốc, cách chế biến, bảo quản..."
        />
      </div>



      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {loading ? 'Đang xử lý...' : product ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
