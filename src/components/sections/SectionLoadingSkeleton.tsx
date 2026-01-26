import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SectionLoadingSkeletonProps {
  statCardsCount?: number;
  showFourStatCards?: boolean;
}

export const SectionLoadingSkeleton = ({ 
  statCardsCount = 3,
  showFourStatCards = false 
}: SectionLoadingSkeletonProps) => {
  const gridCols = showFourStatCards 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stat cards skeleton */}
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {Array.from({ length: statCardsCount }).map((_, i) => (
          <Card key={i} className="card-shadow overflow-hidden border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-7 w-32" />
                </div>
              </div>
              {showFourStatCards && <Skeleton className="h-12 w-full mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <Card className="card-shadow overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-2">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <Skeleton className="h-[280px] md:h-[320px] w-full" />
          </CardContent>
        </Card>
        <Card className="card-shadow overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-2">
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-2">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table skeleton */}
      <Card className="card-shadow overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
