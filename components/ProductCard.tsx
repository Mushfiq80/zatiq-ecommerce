"use client";

import { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem } = useCart();
  const router = useRouter(); 

  const handleAddToCart = () => {
    // Check if product is already in cart
    const isAlreadyInCart = items.some(item => item.id === product.id);

    if (isAlreadyInCart) {
      toast.warn(`${product.name} is already in the cart`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.image,
    });

    toast.success(`${product.name} added to cart`);
  };

  const handleProductClick = () => {
    localStorage.setItem(`product-${product.id}`, JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">
          <p onClick={handleProductClick} className="hover:underline cursor-pointer">
            {product.name}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${Number(product.price).toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Stock: {product.stock} units
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
