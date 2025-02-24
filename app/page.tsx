import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Shop Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Shop</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Discover our curated collection of premium products
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href='/products' className="relative h-[300px] rounded-lg overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Electronics"
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white">Electronics</h3>
          </div>

        </Link>
        <Link href='/products' className="relative h-[300px] rounded-lg overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
            alt="Fashion"
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white">Fashion</h3>
          </div>
        </Link>
        <Link href='/products' className="relative h-[300px] rounded-lg overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
            alt="Accessories"
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-2xl font-bold text-white">Accessories</h3>
          </div>
        </Link>
      </section>
    </div>
  );
}