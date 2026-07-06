"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_USER, signOut } from "@/lib/session";

export function TopBar() {
  const router = useRouter();

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:hidden md:px-6">
      <MobileNav />
      <div className="ml-auto flex items-center gap-1">
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
