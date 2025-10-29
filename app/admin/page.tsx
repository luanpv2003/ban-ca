import { getAllProducts } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';

export default async function AdminDashboard() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <Link
          href="/admin/products/new"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          + Thêm sản phẩm mới
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Chưa có sản phẩm nào</p>
          <Link
            href="/admin/products/new"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Thêm sản phẩm đầu tiên
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá gốc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá bán
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs">
                        {product.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-orange-600">
                        {product.salePrice.toLocaleString('vi-VN')}đ
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded transition-colors touch-manipulation"
                        >
                          Sửa
                        </Link>
                        <DeleteButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="line-through">
                        {product.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                      {' → '}
                      <span className="font-semibold text-orange-600">
                        {product.salePrice.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors touch-manipulation"
                      >
                        Sửa
                      </Link>
                      <DeleteButton productId={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
