import { Skeleton } from "@/components/ui/skeleton"

export default function SchedulesLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[80px]" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-9 w-9" />
          </div>
          <Skeleton className="h-9 w-[120px]" />
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 w-full md:w-[300px]" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />

        {/* Schedule Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-sm">
                  <th className="px-4 py-3 text-left font-medium">
                    <Skeleton className="h-4 w-[100px]" />
                  </th>
                  {Array(7)
                    .fill(0)
                    .map((_, index) => (
                      <th key={index} className="px-4 py-3 text-center font-medium">
                        <Skeleton className="mx-auto h-4 w-[60px]" />
                        <Skeleton className="mx-auto mt-1 h-3 w-[80px]" />
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-[120px]" />
                            <Skeleton className="mt-1 h-3 w-[80px]" />
                          </div>
                        </div>
                      </td>
                      {Array(7)
                        .fill(0)
                        .map((_, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-3 text-center">
                            <Skeleton className="mx-auto h-16 w-[120px] rounded-md" />
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

