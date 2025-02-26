"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); 
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/admin/authAdmin");
      }
      setCheckingAuth(false);
    }
  }, [user, loading, router]);

  if (loading || checkingAuth) return <p>Loading...</p>; 

  return <>{children}</>;
}
