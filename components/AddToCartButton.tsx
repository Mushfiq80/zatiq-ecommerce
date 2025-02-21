'use client';

import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button 
      onClick={handleAddToCart} 
      className="w-full md:w-auto"
      disabled={product.stock === 0}
    >
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
}