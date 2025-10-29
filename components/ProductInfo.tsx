interface ProductInfoProps {
  title: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  description: string;
}

export default function ProductInfo({
  title,
  originalPrice,
  salePrice,
  discount,
  description,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        {title}
      </h1>

      {/* Price Section */}
      <div className="mb-6 p-4 bg-orange-50 rounded-lg">
        <div className="flex items-center gap-3 flex-wrap mb-2">
          {originalPrice > salePrice && (
            <span className="text-gray-400 line-through text-xl">
              {originalPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
          <span className="text-orange-600 font-bold text-4xl">
            {salePrice.toLocaleString('vi-VN')}đ
          </span>
        </div>
        {discount > 0 && (
          <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-md font-bold">
            Giảm {discount}%
          </div>
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
          {description}
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
  );
}
