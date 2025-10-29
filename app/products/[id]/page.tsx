import { getProductById } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductDetailHeader from '@/components/ProductDetailHeader';
import ProductBreadcrumb from '@/components/ProductBreadcrumb';
import ProductImage from '@/components/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ProductStorageInfo from '@/components/ProductStorageInfo';
import Footer from '@/components/Footer';

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

  const discount = product.originalPrice > product.salePrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <ProductDetailHeader />

      <main className="container mx-auto px-4 py-8">
        <ProductBreadcrumb productTitle={product.title} />

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <ProductImage
              imageUrls={product.imageUrls || [product.imageUrl]}
              title={product.title}
              discount={discount}
            />
            <ProductInfo
              title={product.title}
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
              discount={discount}
              description={product.description}
            />
          </div>
        </div>

        <ProductStorageInfo />
      </main>

      <Footer />
    </div>
  );
}
