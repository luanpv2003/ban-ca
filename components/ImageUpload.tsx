'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước file không được vượt quá 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload thất bại');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Có lỗi xảy ra khi upload ảnh');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hình ảnh sản phẩm *
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
        />
      </div>

      {uploading && (
        <div className="mt-2 text-sm text-blue-600">
          Đang upload...
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {value && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <div className="relative w-full aspect-square max-w-xs rounded-lg overflow-hidden border-2 border-gray-200">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
