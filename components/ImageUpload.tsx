'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUpload({ value = [], onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} không phải là file hình ảnh`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} vượt quá 5MB`);
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success && data.url) {
          return data.url;
        } else {
          throw new Error(data.error || 'Upload thất bại');
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...value, ...uploadedUrls]);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Có lỗi xảy ra khi upload ảnh');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hình ảnh sản phẩm * (có thể chọn nhiều ảnh)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
        />
        <p className="mt-1 text-xs text-gray-500">
          Ảnh đầu tiên sẽ là ảnh chính. Kéo thả để sắp xếp lại.
        </p>
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

      {value.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Preview ({value.length} ảnh):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {value.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                  {index === 0 && (
                    <div className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Ảnh chính
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
