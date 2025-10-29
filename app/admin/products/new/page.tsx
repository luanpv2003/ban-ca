import ProductForm from '@/components/ProductForm';
import { createProductAction } from '@/lib/actions';

export default function NewProductPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Thêm sản phẩm mới
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ProductForm onSubmit={createProductAction} />
      </div>
    </div>
  );
}
