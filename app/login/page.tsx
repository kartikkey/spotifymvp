"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignedIn, signIn } from "@/lib/session";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn()) {
      router.replace("/dashboard");
    }
  }, [router]);

  function handleSignIn() {
    setLoading(true);
    // Simulated SSO round-trip — enough delay to feel like a real redirect
    // without a real identity provider.
    setTimeout(() => {
      signIn();
      router.push("/dashboard");
    }, 600);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo/spotify-mark.webp" alt="" width={40} height={40} />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-bold tracking-tight text-text-primary">Amplify</h1>
            <p className="text-sm text-text-secondary">Product Intelligence for Spotify</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-lg bg-surface-2 p-6">
          <p className="text-center text-sm text-text-secondary">
            Sign in with your Spotify workspace account to access opportunities, AI insights,
            experiments, and voice of customer data.
          </p>
          <Button
            onClick={handleSignIn}
            disabled={loading}
            className="h-10 w-full rounded-full bg-white text-sm font-bold text-black hover:bg-white/90"
          >
            {loading ? "Redirecting to SSO..." : "Continue with Spotify SSO"}
          </Button>
        </div>

        <p className="text-center text-xs text-text-tertiary">
          Internal tool &middot; Spotify employees only
        </p>
      </div>
    </div>
  );
}
