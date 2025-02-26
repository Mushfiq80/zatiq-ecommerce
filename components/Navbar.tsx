'use client';

import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

export default function Navbar() {
  const { items, updateQuantity, checkout, total } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Zatiq
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <Link href="/admin/authAdmin" className="hover:text-primary">
              Admin
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">

                      {items.length}
                    </span>

                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  <div className="py-4">
                    {items.length === 0 ? (
                      <div className="text-muted-foreground">Your cart is empty</div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Quantity:
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="ml-2">
                                  ➖
                                </button>
                                {item.quantity}
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="ml-2">
                                  ➕
                                </button>
                              </div>
                            </div>
                            <div>${item.price * item.quantity}</div>
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="font-bold">Total: ${total}</div>
                        </div>
                        <Button className="w-full" onClick={checkout}>Checkout</Button>
                      </div>
                    )}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>


            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/"
                    className="hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link
                    href="/admin/auth"
                    className="hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}