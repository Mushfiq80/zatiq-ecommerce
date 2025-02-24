"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/firebase";
import AddToCartButton from "@/components/AddToCartButton";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id as string);
        if (!fetchedProduct) {
          setError("Product not found");
          router.push("/404");
          return;
        }
        setProduct(fetchedProduct);
      } catch (error) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, router]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product?.image || "/placeholder.jpg"} // ✅ Prevents errors if image is missing
            alt={product?.name || "Product Image"}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <p className="text-2xl font-bold mt-2">${product?.price?.toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-muted-foreground">{product?.description || "No description available."}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Availability</h2>
            <p className={(product?.stock ?? 0) > 0 ? "text-green-600" : "text-red-600"}>
              {(product?.stock ?? 0) > 0 ? `${product?.stock} units in stock` : "Out of stock"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Category</h2>
            <p className="text-muted-foreground">{product?.category || "Uncategorized"}</p>
          </div>

          {product && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
}
