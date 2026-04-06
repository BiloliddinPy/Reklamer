"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfluencerDashboard } from "@/features/profile/components/InfluencerDashboard";
import { BrandDashboard } from "@/features/profile/components/BrandDashboard";
import { useAuthStore } from "@/store/authStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated || !user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col relative pb-20">
       {user.role === "influencer" && <InfluencerDashboard />}
       {user.role === "brand" && <BrandDashboard />}
       
    </div>
  );
}
