'use client';

import { ShoppingCart, Menu, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

export default function Navbar() {
  const { items, total } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">Zatiq</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <Link href={user ? "/admin/adminProducts" : "/admin/authAdmin"} className="hover:text-primary">
              Admin
            </Link>
          </div>

          {/* Cart & User Controls */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
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
                                Quantity: {item.quantity}
                              </div>
                            </div>
                            <div>${item.price * item.quantity}</div>
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="font-bold">Total: ${total}</div>
                        </div>
                        <Button className="w-full">Checkout</Button>
                      </div>
                    )}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            {/* User Authentication Section */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
                  <Link href="/products" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>Products</Link>
                  <Link href={user ? "/admin/adminProducts" : "/admin/authAdmin"} className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Admin
                  </Link>

                  {/* Login Button (If Not Logged In) */}
                  {!user && (
                    <Link href="/admin/authAdmin" className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Show User Email & Logout Button if Logged In */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Button onClick={logout} variant="outline" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/admin/authAdmin">
                <Button variant="outline" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
