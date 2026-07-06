"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { useCommandPalette } from "./command-palette-context";
import { NAV_ITEMS } from "./nav-items";
import { ASK_AI_ENTRIES, type AskAIEntry } from "@/lib/data/ask-ai";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const [answer, setAnswer] = useState<AskAIEntry | null>(null);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setAnswer(null), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  if (answer) {
    return (
      <CommandDialog open={open} onOpenChange={setOpen} title="Ask AI">
        <div className="flex flex-col gap-4 p-4">
          <button
            type="button"
            onClick={() => setAnswer(null)}
            className="flex w-fit items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="size-3.5" />
            Back to search
          </button>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green">
              Ask AI
            </span>
            <p className="text-sm font-semibold text-text-primary">{answer.question}</p>
            <p className="text-sm leading-relaxed text-text-secondary">{answer.answer}</p>
          </div>
          <button
            type="button"
            onClick={() => go(answer.linkHref)}
            className="flex w-fit items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
          >
            {answer.linkLabel}
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>
      </CommandDialog>
    );
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Ask AI or jump to a page">
      <Command>
        <CommandInput placeholder="Ask AI or jump to..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Ask AI">
            {ASK_AI_ENTRIES.map((entry) => (
              <CommandItem key={entry.id} value={entry.question} onSelect={() => setAnswer(entry)}>
                <Sparkles className="size-4 text-brand-green" />
                {entry.question}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Pages">
            {NAV_ITEMS.map((item) => (
              <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                <item.icon className="size-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
