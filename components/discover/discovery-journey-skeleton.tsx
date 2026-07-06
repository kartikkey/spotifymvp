"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryJourneySkeleton() {
  return (
    <div className="flex flex-col gap-6 border-t border-border/60 pt-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-6 w-52" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-1 w-full rounded-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="flex gap-4"
        >
          <Skeleton className="mt-5 size-7 rounded-full" />
          <div className="flex flex-1 gap-4 rounded-md bg-surface-2 p-4">
            <Skeleton className="size-16 rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
