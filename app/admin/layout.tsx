"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/authAdmin"); 
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-center p-4">Checking authentication...</p>; 

  return <>{children}</>;
}
