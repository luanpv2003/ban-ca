import Link from 'next/link';

export default function ProductDetailHeader() {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-2xl font-bold hover:text-orange-100 transition-colors">
          🐟 Cá Khô Đặc Sản
        </Link>
      </div>
    </header>
  );
}
