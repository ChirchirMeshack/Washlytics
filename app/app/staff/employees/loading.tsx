import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmployeesLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="mt-2 h-4 w-[350px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[150px]" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-[50px]" />
                <Skeleton className="mt-1 h-3 w-[120px]" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 w-full md:w-[300px]" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
        <Skeleton className="h-10 w-full md:w-[180px]" />
      </div>

      {/* Employees Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50 text-sm">
                <th className="px-4 py-3 text-left font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <Skeleton className="h-4 w-[100px]" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </th>
                <th className="px-4 py-3 text-left font-medium">
                  <Skeleton className="h-4 w-[80px]" />
                </th>
                <th className="px-4 py-3 text-right font-medium">
                  <Skeleton className="h-4 w-[80px] ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-[120px]" />
                          <Skeleton className="mt-1 h-3 w-[150px]" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-[80px]" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-[100px]" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-5 w-[70px] rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-[80px]" />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Skeleton className="h-8 w-8 rounded-full ml-auto" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

