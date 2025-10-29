import { getProductById } from '@/lib/db';
import { updateProductAction } from '@/lib/actions';
import ProductForm from '@/components/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const updateAction = async (formData: FormData) => {
    'use server';
    return updateProductAction(id, formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Chỉnh sửa sản phẩm
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ProductForm product={product} onSubmit={updateAction} />
      </div>
    </div>
  );
}
