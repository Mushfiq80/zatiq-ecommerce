"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "@/lib/firebase";
import Link from "next/link";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  price: number | string;
  stock: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();

        const formattedProducts: Product[] = productList.map((product) => ({
          ...product,
          price: Number(product.price) || 0,
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

  // ✅ Handle product deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      toast.warning("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product.");
    }
  };

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Product List</h1>
      <Link href="/admin/adminProducts/create">
        <button className="bg-blue-500 text-white px-4 py-2 mb-4">Add Product</button>
      </Link>
      <table className="w-full border">
        <thead>
          <tr className="text-center font-bold bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">${Number(product.price).toFixed(2)}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2 space-x-2">
                  <Link href={`/admin/adminProducts/edit/${product.id}`}>
                    <button className="bg-yellow-500 text-white px-2 py-1">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
