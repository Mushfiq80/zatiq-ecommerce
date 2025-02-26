"use client";

import { useState, useEffect } from "react";
import { getProducts, deleteProduct, getOrders, deleteOrder } from "@/lib/firebase";
import Link from "next/link";
import { toast } from "react-toastify";

interface Product {
  id: string;
  name: string;
  price: number | string;
  stock: number;
}

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  createdAt: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        setProducts(productList.map((p) => ({ ...p, price: Number(p.price) || 0 })));
      } catch (err) {
        setError("Failed to load products");
      }
    };

    const fetchOrders = async () => {
      try {
        const orderList = await getOrders() as Order[];
        setOrders(orderList);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchProducts();
    fetchOrders();
    setLoading(false);
  }, []);

  // ✅ Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.warning("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete product.");
    }
  };

  // ✅ Handle order deletion
  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.warning("Order deleted successfully.");
    } catch (error) {
      console.error("Failed to delete order:", error);
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

      {/* Product Table */}
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
                    onClick={() => handleDeleteProduct(product.id)}
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

      {/* Checkout Details (Orders) */}
      <h2 className="text-2xl font-bold mt-8">Checkout Orders</h2>
      <div className="space-y-4 mt-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow-sm bg-black">
              <p className="font-bold">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="font-medium">Total: <span className="text-green-600">${order.total.toFixed(2)}</span></p>
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    🛒 {item.name} x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="bg-red-500 text-white px-3 py-1 mt-3 rounded-md"
              >
                Delete Order
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}
