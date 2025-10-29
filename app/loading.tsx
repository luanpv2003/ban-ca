export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="h-12 bg-orange-400 rounded animate-pulse max-w-md mx-auto"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
