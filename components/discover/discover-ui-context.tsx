"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { DiscoveryTrack } from "@/lib/types";

interface NowPlaying {
  track: DiscoveryTrack;
}

interface DiscoverUIContextValue {
  profileOpen: boolean;
  openProfile: () => void;
  closeProfile: () => void;
  scrollToProfile: () => void;
  nowPlaying: NowPlaying | null;
  isPlaying: boolean;
  setNowPlaying: (track: DiscoveryTrack | null, playing: boolean) => void;
}

const DiscoverUIContext = createContext<DiscoverUIContextValue | null>(null);

export function DiscoverUIProvider({ children }: { children: ReactNode }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [nowPlaying, setNowPlayingState] = useState<NowPlaying | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const setNowPlaying = useCallback((track: DiscoveryTrack | null, playing: boolean) => {
    if (!track || !playing) {
      setNowPlayingState(null);
      setIsPlaying(false);
      return;
    }
    setNowPlayingState({ track });
    setIsPlaying(true);
  }, []);

  return (
    <DiscoverUIContext.Provider
      value={{
        profileOpen,
        openProfile,
        closeProfile,
        scrollToProfile,
        nowPlaying,
        isPlaying,
        setNowPlaying,
      }}
    >
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
