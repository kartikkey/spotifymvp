"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryJourneySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-6 w-52" />
        <Skeleton className="mt-1 h-4 w-full max-w-md" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-xs font-medium text-text-tertiary"
      >
        Curating your discovery journey…
      </motion.p>

      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center pt-1">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              {index < 4 ? <div className="my-1.5 w-px flex-1 bg-border/60" aria-hidden /> : null}
            </div>
            <div className="discover-card mb-6 flex flex-1 flex-col gap-5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="size-[72px] shrink-0 rounded-md sm:size-28" />
                <div className="flex flex-1 flex-col gap-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-2 w-full rounded-full" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-16 w-full rounded-md" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
