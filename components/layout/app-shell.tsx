import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { DiscoverUIProvider } from "@/components/discover/discover-ui-context";
import { DiscoverPlayerBar } from "@/components/discover/discover-player-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <DiscoverUIProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
              {children}
            </div>
          </main>
          <DiscoverPlayerBar />
        </div>
      </div>
    </DiscoverUIProvider>
  );
}
