"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "@/lib/firebase";
import { Product } from "@/types";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id as string);
        if (!fetchedProduct) {
          setError("Product not found");
          return;
        }
        setProduct(fetchedProduct as Product); // ✅ Ensure it's treated as a full Product
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!product) return;
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await updateProduct(id as string, product);
      router.push("/admin/adminProducts"); // ✅ Redirect after update
    } catch {
      setError("Failed to update product");
    }
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product?.name || ""} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="price" value={product?.price || 0} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" value={product?.description || ""} onChange={handleChange} className="border p-2 w-full" required></textarea>
        <input type="text" name="image" value={product?.image || ""} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="stock" value={product?.stock || 0} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="category" value={product?.category || ""} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update Product</button>
      </form>
    </div>
  );
}
