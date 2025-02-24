"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/lib/firebase";
import { useParams } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductPage() {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<{ id: string; name: string; image: string; price: number; description: string; stock: number; category: string } | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id) as { id: string; name: string; image: string; price: number; description: string; stock: number; category: string };
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image src={product.image} alt={product.name} fill className="object-cover rounded-lg" priority />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
