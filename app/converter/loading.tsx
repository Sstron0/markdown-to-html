import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConverterLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Markdown Input Skeleton */}
          <Card className="p-4 flex flex-col h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            <Skeleton className="flex-1 rounded-md" />
          </Card>

          {/* HTML Preview Skeleton */}
          <Card className="p-4 flex flex-col h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="flex-1 rounded-md" />
            <div className="flex justify-end gap-2 mt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </Card>
        </div>

        {/* Features Section Skeleton */}
        <Card className="p-4">
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
