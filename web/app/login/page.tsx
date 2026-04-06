"use client";

import { Suspense } from "react";
import { AuthForm } from "@/features/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary font-black animate-pulse">
        <span className="mb-2">R.</span>
        Kuting...
      </div>}>
      <AuthForm />
    </Suspense>
  );
}
