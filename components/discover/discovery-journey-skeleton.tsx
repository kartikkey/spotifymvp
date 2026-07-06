import { Skeleton } from "@/components/ui/skeleton";

export function DiscoveryJourneySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-72" />
      </div>
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              {index < 4 ? <div className="my-1 w-px flex-1 bg-border" aria-hidden /> : null}
            </div>
            <div className="mb-6 flex flex-1 flex-col gap-4 rounded-lg bg-surface-2 p-5">
              <Skeleton className="h-3 w-24" />
              <div className="flex gap-4">
                <Skeleton className="size-20 shrink-0 rounded-md sm:size-24" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-3.5 w-1/2" />
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
