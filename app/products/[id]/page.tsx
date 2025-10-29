import { getProductById } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const savings = product.originalPrice - product.salePrice;
  const discount = product.originalPrice > product.salePrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-bold hover:text-orange-100 transition-colors">
            🐟 Cá Khô Đặc Sản
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-orange-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li>
              <span className="text-gray-400">Sản phẩm</span>
            </li>
            <li>/</li>
            <li className="text-orange-600 font-medium line-clamp-1">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column - Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Right Column - Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>

              {/* Price Section */}
              <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {product.originalPrice > product.salePrice && (
                    <span className="text-gray-400 line-through text-xl">
                      {product.originalPrice.toLocaleString('vi-VN')}đ
                    </span>
                  )}
                  <span className="text-orange-600 font-bold text-4xl">
                    {product.salePrice.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                {savings > 0 && (
                  <p className="text-green-600 font-medium">
                    Tiết kiệm {savings.toLocaleString('vi-VN')}đ
                  </p>
                )}
              </div>

              {/* Product Highlights */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Đặc điểm nổi bật
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Cá tươi, sấy khô tự nhiên</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Đảm bảo chất lượng và vệ sinh an toàn thực phẩm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Giao hàng tận nơi, đóng gói cẩn thận</span>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Mô tả sản phẩm
                </h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {product.description}
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-auto pt-6 border-t">
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="tel:0123456789"
                    className="flex-1 min-w-[140px] bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-4 sm:px-6 rounded-lg transition-colors text-center text-sm sm:text-base touch-manipulation"
                  >
                    📞 Gọi ngay
                  </a>
                  <a
                    href="https://zalo.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-4 sm:px-6 rounded-lg transition-colors text-center text-sm sm:text-base touch-manipulation"
                  >
                    💬 Chat Zalo
                  </a>
                </div>
                <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors text-base sm:text-lg touch-manipulation">
                  🛒 Đặt hàng ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Thông tin bảo quản
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>• Bảo quản nơi khô ráo, thoáng mát</p>
            <p>• Tránh ánh nắng trực tiếp</p>
            <p>• Có thể bảo quản trong tủ lạnh để giữ được lâu hơn</p>
            <p>• Sử dụng trong vòng 3-6 tháng kể từ ngày sản xuất</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Cá Khô Đặc Sản. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
