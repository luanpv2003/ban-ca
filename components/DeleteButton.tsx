'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@/lib/actions';

interface DeleteButtonProps {
  productId: string;
}

export default function DeleteButton({ productId }: DeleteButtonProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const result = await deleteProductAction(productId);

      if (result.success) {
        router.refresh();
        setShowConfirm(false);
      } else {
        alert(result.error || 'Có lỗi xảy ra khi xóa sản phẩm');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded transition-colors text-sm touch-manipulation"
      >
        Xóa
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Xác nhận xóa sản phẩm
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? 'Đang xóa...' : 'Xóa'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
