"use client";

import { useState } from "react";
import { addProduct } from "@/lib/firebase"; 
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      toast.success("Product added successfully!"); 
      await addProduct(product); 
      router.push("/admin/adminProducts");
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border p-2 w-full" required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 w-full" required></textarea>
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="border p-2 w-full" required />
        <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
