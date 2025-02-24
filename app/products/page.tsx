"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/firebase";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        
        // ✅ Ensure correct type by explicitly casting
        const formattedProducts: Product[] = productList.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description || "",
          image: product.image || "",
          stock: product.stock ?? 0,  // Default to 0 if undefined
          category: product.category || "Uncategorized",
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center col-span-3 text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
