"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/authAdmin"); 
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>; 

  return <>{children}</>;
}
