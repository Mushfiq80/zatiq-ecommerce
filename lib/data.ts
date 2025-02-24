// import { Product } from "@/types";
// import { v4 as uuidv4 } from "uuid";

// export let products: Product[] = [];

// if (typeof window !== "undefined") {
//   // ✅ Only access localStorage on Client-Side
//   products = JSON.parse(localStorage.getItem("products") || "[]");
// } else {
//   // ✅ Fallback default products for Server-Side
//   products = [
//     {
//       id: "1",
//       name: "Premium Wireless Headphones",
//       price: 199.99,
//       description: "High-quality wireless headphones with noise cancellation.",
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//       stock: 50,
//       category: "Electronics",
//     },
//     {
//       id: "2",
//       name: "Smart Watch Pro",
//       price: 299.99,
//       description: "Advanced smartwatch with health monitoring features.",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
//       stock: 30,
//       category: "Electronics",
//     },
//     {
//       id: "3",
//       name: "Leather Messenger Bag",
//       price: 79.99,
//       description: "Stylish leather messenger bag for everyday use.",
//       image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
//       stock: 25,
//       category: "Accessories",
//     },
//   ];
// }

// // ✅ Save to localStorage only on Client-Side
// export const addProduct = (product: Omit<Product, "id">) => {
//   const newProduct: Product = { id: uuidv4(), ...product };
//   products.push(newProduct);

//   if (typeof window !== "undefined") {
//     localStorage.setItem("products", JSON.stringify(products));
//   }
// };
