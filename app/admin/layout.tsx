import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-2xl font-bold hover:text-gray-300 transition-colors">
              🔧 Admin Panel
            </Link>
            <Link
              href="/"
              className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
            >
              Xem trang chủ
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
