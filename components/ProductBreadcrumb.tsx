import Link from 'next/link';

interface ProductBreadcrumbProps {
  productTitle: string;
}

export default function ProductBreadcrumb({ productTitle }: ProductBreadcrumbProps) {
  return (
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
          {productTitle}
        </li>
      </ol>
    </nav>
  );
}
