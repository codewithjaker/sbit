"use client";

import { Button } from "@/components/ui/button";
// import { Logo } from "@/components/logo";
import { Home, ArrowLeft, Search, Code } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          {/* <Logo /> */}
        </div>

        {/* 404 Graphic */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative bg-white rounded-2xl p-8 border shadow-lg">
            <div className="text-9xl font-bold text-primary mb-4">404</div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Page Not Found
              </h1>
              <p className="text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Homepage
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
