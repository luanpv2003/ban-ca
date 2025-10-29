import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  href: string;
}

export default function ProductCard({ product, href }: ProductCardProps) {
  const discount = product.originalPrice > product.salePrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={href}>
      <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer active:scale-100 touch-manipulation">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>
        
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-orange-600 transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-2 flex-wrap">
            {product.originalPrice > product.salePrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
            <span className="text-orange-600 font-bold text-lg sm:text-xl">
              {product.salePrice.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
