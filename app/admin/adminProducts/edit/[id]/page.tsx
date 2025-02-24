import { getProductById, getProducts } from "@/lib/firebase";
import EditProductForm from "./EditProductForm";

// ✅ Tell Next.js how to generate static params
export async function generateStaticParams() {
  const products = await getProducts(); // Fetch all product IDs
  return products.map((product) => ({ id: product.id }));
}

// ✅ Fetch product data on the server before rendering
export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <p className="text-center py-8 text-red-500">Product not found</p>;
  }

  return <EditProductForm product={product} />; // ✅ Pass product to client-side form
}
