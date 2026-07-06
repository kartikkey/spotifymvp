"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryJourneySkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-xs font-medium text-text-tertiary"
      >
        Curating your journey…
      </motion.p>

      <div className="discover-card flex flex-col items-center gap-5">
        <Skeleton className="size-40 rounded-md sm:size-48" />
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full max-w-sm rounded-full" />
        <div className="flex gap-3">
          <Skeleton className="size-11 rounded-full" />
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="size-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
