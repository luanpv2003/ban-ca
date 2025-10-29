'use client';

import { useState } from 'react';

interface FeaturesInputProps {
  value: string[];
  onChange: (features: string[]) => void;
}

export default function FeaturesInput({ value, onChange }: FeaturesInputProps) {
  const [features, setFeatures] = useState<string[]>(value.length > 0 ? value : ['']);

  const handleFeatureChange = (index: number, newValue: string) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = newValue;
    setFeatures(updatedFeatures);
    
    // Filter out empty strings before passing to parent
    const nonEmptyFeatures = updatedFeatures.filter(f => f.trim() !== '');
    onChange(nonEmptyFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures.length > 0 ? updatedFeatures : ['']);
    
    // Filter out empty strings before passing to parent
    const nonEmptyFeatures = updatedFeatures.filter(f => f.trim() !== '');
    onChange(nonEmptyFeatures);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Đặc điểm nổi bật
        </label>
        <button
          type="button"
          onClick={addFeature}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          + Thêm đặc điểm
        </button>
      </div>
      
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="VD: Cá tươi, sấy khô tự nhiên"
            />
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Xóa đặc điểm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-500">
        Thêm các đặc điểm nổi bật của sản phẩm để khách hàng dễ dàng nhận biết
      </p>
    </div>
  );
}
