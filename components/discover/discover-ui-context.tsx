"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface DiscoverUIContextValue {
  profileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  scrollToProfile: () => void;
}

const DiscoverUIContext = createContext<DiscoverUIContextValue | null>(null);

export function DiscoverUIProvider({ children }: { children: ReactNode }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const scrollToProfile = useCallback(() => {
    const el = document.getElementById("profile");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const openProfile = useCallback(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      scrollToProfile();
    } else {
      setProfileOpen(true);
    }
  }, [scrollToProfile]);

  const closeProfile = useCallback(() => setProfileOpen(false), []);

  return (
    <DiscoverUIContext.Provider value={{ profileOpen, openProfile, closeProfile, scrollToProfile }}>
      {children}
    </DiscoverUIContext.Provider>
  );
}

export function useDiscoverUI() {
  const ctx = useContext(DiscoverUIContext);
  if (!ctx) {
    throw new Error("useDiscoverUI must be used within DiscoverUIProvider");
  }
  return ctx;
}
