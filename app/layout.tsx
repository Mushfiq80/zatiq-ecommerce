import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern E-commerce Shop',
  description: 'Your one-stop shop for all your needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <ToastContainer />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
