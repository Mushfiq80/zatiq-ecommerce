"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/authAdmin"); // Redirect if not logged in
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>; // Prevent flash before redirect

  return <>{children}</>;
}
