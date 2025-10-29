import { getAllProducts } from '@/lib/db';
import ProductCard from '@/components/ProductCard';
import { Suspense } from 'react';

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProductList() {
  const products = await getAllProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">
          Chưa có sản phẩm nào. Vui lòng quay lại sau!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          href={`/products/${product.id}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-6 md:py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2">
            🐟 Cá Khô Đặc Sản
          </h1>
          <p className="text-center text-orange-100 text-sm sm:text-base md:text-lg">
            Tươi ngon - Đảm bảo chất lượng - Giao hàng tận nơi
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 md:mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">&copy; 2024 Cá Khô Đặc Sản. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
