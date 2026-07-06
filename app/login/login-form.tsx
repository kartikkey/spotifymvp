"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignedIn, signIn } from "@/lib/session";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSignedIn()) {
      router.replace("/discover");
    }
  }, [router]);

  function handleSignIn() {
    setLoading(true);
    setTimeout(() => {
      signIn();
      router.push("/discover");
    }, 600);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Image src="/logo/spotify-mark.webp" alt="" width={40} height={40} />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-xl font-bold tracking-tight text-text-primary">
              Discover<span className="text-brand-green">+</span>
            </h1>
            <p className="text-sm text-text-secondary">Find your next favorite song</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-lg bg-surface-2 p-6">
          <p className="text-center text-sm text-text-secondary">
            Sign in with your Spotify account to start a personalized discovery journey.
          </p>
          <Button
            onClick={handleSignIn}
            disabled={loading}
            className="h-10 w-full rounded-full bg-white text-sm font-bold text-black hover:bg-white/90"
          >
            {loading ? "Connecting..." : "Continue with Spotify"}
          </Button>
        </div>
      </div>
    </div>
  );
}
