"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/lib/firebase";
import { Product } from "@/types";

interface EditProductProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductProps) {
  const router = useRouter();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProduct(product.id, updatedProduct);
      router.push("/admin/adminProducts");
    } catch {
      setError("Failed to update product");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={updatedProduct.name} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" value={updatedProduct.description} onChange={handleChange} className="border p-2 w-full" required></textarea>
        <input type="text" name="image" value={updatedProduct.image} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="stock" value={updatedProduct.stock} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="category" value={updatedProduct.category} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update Product</button>
      </form>
    </div>
  );
}
