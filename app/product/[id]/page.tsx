import { getProducts, getProductById } from "@/lib/firebase";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";


export async function generateStaticParams() {
  const products = await getProducts(); // Fetch all product IDs
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id); // Fetch product details at build time

  if (!product) {
    return <p className="text-center py-8 text-red-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name || "Product Image"}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${Number(product.price).toFixed(2)}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description || "No description available."}</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Availability</h2>
            <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Category</h2>
            <p className="text-muted-foreground">{product.category || "Uncategorized"}</p>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
