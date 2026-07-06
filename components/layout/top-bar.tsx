"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { useCommandPalette } from "./command-palette-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_USER, signOut } from "@/lib/session";

const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Weekly digest is ready",
    detail: "3 new insights and 2 opportunity updates since Monday.",
  },
  {
    id: "n2",
    title: "exp-04 is ready to ship",
    detail: "Family Plan invite flow cleared review with a 66% support-contact drop.",
  },
];

export function TopBar() {
  const { setOpen } = useCommandPalette();
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
      <MobileNav />

      <button
        type="button"
        id="ask-ai-trigger"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full max-w-sm items-center gap-2 rounded-md bg-surface-2 px-3 text-sm text-text-tertiary transition-colors hover:bg-surface-3 hover:text-text-secondary"
      >
        <Search className="size-3.5 shrink-0" />
        <span className="truncate">Ask AI or jump to...</span>
        <kbd className="ml-auto hidden shrink-0 rounded border border-border bg-surface-3 px-1.5 py-0.5 font-sans text-[10px] font-medium text-text-tertiary sm:inline-block">
          &#8984;K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="Notifications" className="relative" />}
          >
            <Bell className="size-4.5" />
            <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand-green" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NOTIFICATIONS.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                <span className="text-sm font-medium text-text-primary">{n.title}</span>
                <span className="text-xs text-text-secondary">{n.detail}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-full bg-surface-3 text-xs font-semibold text-text-primary"
              />
            }
          >
            {MOCK_USER.initials}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex flex-col items-start gap-0">
              <span className="text-sm font-medium text-text-primary">{MOCK_USER.name}</span>
              <span className="text-xs font-normal text-text-secondary">{MOCK_USER.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="size-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
