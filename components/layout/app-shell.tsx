import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { DiscoverUIProvider } from "@/components/discover/discover-ui-context";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <DiscoverUIProvider>
      <div className="flex h-dvh w-full overflow-hidden bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DiscoverUIProvider>
  );
}
