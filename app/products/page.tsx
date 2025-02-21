import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}