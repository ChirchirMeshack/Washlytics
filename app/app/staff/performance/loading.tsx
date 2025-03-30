import { CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformanceLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-[350px]" />
          <Skeleton className="mt-2 h-4 w-[450px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[150px]" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 w-full md:w-[300px]" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
      </div>

      {/* Employee Selection */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="mt-1 h-4 w-[80px]" />
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-[60px]" />
                    <Skeleton className="h-3 w-[30px]" />
                  </div>
                  <Skeleton className="mt-1 h-2 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Performance Dashboard */}
      <div className="space-y-6">
        <Skeleton className="h-7 w-[300px]" />

        {/* Performance Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-[120px]" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-[60px]" />
                  <Skeleton className="mt-2 h-2 w-full" />
                  <Skeleton className="mt-2 h-3 w-[150px]" />
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-[350px]" />

          {/* Tab Content */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-[150px]" />
              <Skeleton className="h-9 w-[120px]" />
            </div>

            {/* Cards */}
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-[200px]" />
                    <Skeleton className="mt-1 h-4 w-[150px]" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full justify-end gap-2">
                      <Skeleton className="h-9 w-[100px]" />
                      <Skeleton className="h-9 w-[120px]" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

