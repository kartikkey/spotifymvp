"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { isSignedIn } from "@/lib/session";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return false;
}

/**
 * Mock session gate for the (app) route group. Reads localStorage via
 * useSyncExternalStore so the client-only check is hydration-safe — real
 * auth would swap this for a server-side check (middleware or a cookie
 * read) without touching anything downstream.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const signedIn = useSyncExternalStore(subscribe, isSignedIn, getServerSnapshot);

  useEffect(() => {
    if (!signedIn) {
      router.replace("/login");
    }
  }, [signedIn, router]);

  if (!signedIn) return null;

  return <>{children}</>;
}
