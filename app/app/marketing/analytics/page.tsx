import type { Metadata } from "next";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";

export const metadata: Metadata = {
  title: "SMS Analytics | Sparkle",
  description: "Track and analyze your SMS campaign performance",
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SMS Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your SMS campaign performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total SMS Sent"
          value="2,458"
          description="Last 30 days"
          trend="+12.5%"
          trendDirection="up"
        />
        <MetricCard
          title="Delivery Rate"
          value="98.2%"
          description="Last 30 days"
          trend="+0.8%"
          trendDirection="up"
        />
        <MetricCard
          title="Average Cost"
          value="$0.042"
          description="Per message"
          trend="-3.1%"
          trendDirection="down"
        />
        <MetricCard
          title="Total Cost"
          value="$103.24"
          description="Last 30 days"
          trend="+8.7%"
          trendDirection="up"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Delivery Status</CardTitle>
              <Select defaultValue="30days">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Breakdown of message delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                { name: "Delivered", value: 2413 },
                { name: "Failed", value: 32 },
                { name: "Pending", value: 13 },
              ]}
              category="value"
              index="name"
              colors={["rgba(34, 197, 94, 0.7)", "rgba(239, 68, 68, 0.7)", "rgba(234, 179, 8, 0.7)"]}
              showLegend={true}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">SMS Volume Over Time</CardTitle>
              <Select defaultValue="30days">
                <SelectTrigger className="h-8 w-[150px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Number of messages sent over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { week: "Week 1", SMS: 520 },
                { week: "Week 2", SMS: 680 },
                { week: "Week 3", SMS: 595 },
                { week: "Week 4", SMS: 663 },
              ]}
              index="week"
              categories={["SMS"]}
              colors={["rgba(59, 130, 246, 1)"]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Metrics</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
        </TabsList>

        {/* Campaign Performance */}
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Campaign Performance</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <CardDescription>Comparative analysis of recent campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { campaign: "Weekend Special", DeliveryRate: 98.7, EngagementRate: 12.3 },
                  { campaign: "Loyalty Rewards", DeliveryRate: 97.5, EngagementRate: 18.7 },
                  { campaign: "New Service", DeliveryRate: 99.1, EngagementRate: 22.1 },
                  { campaign: "Maintenance", DeliveryRate: 92.3, EngagementRate: 8.5 },
                  { campaign: "Holiday Hours", DeliveryRate: 98.9, EngagementRate: 14.2 },
                ]}
                index="campaign"
                categories={["DeliveryRate", "EngagementRate"]}
                colors={["rgba(59, 130, 246, 0.7)", "rgba(16, 185, 129, 0.7)"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Delivery Metrics */}
        <TabsContent value="delivery" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Delivery Metrics</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <CardDescription>Detailed analysis of message delivery performance</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={[
                  { month: "Jan", DeliveryRate: 97.8, AvgDeliveryTime: 3.2 },
                  { month: "Feb", DeliveryRate: 98.2, AvgDeliveryTime: 2.8 },
                  { month: "Mar", DeliveryRate: 98.5, AvgDeliveryTime: 2.5 },
                  { month: "Apr", DeliveryRate: 97.9, AvgDeliveryTime: 2.7 },
                  { month: "May", DeliveryRate: 98.7, AvgDeliveryTime: 2.4 },
                  { month: "Jun", DeliveryRate: 98.2, AvgDeliveryTime: 2.6 },
                ]}
                index="month"
                categories={["DeliveryRate", "AvgDeliveryTime"]}
                colors={["rgba(34, 197, 94, 1)", "rgba(249, 115, 22, 1)"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis */}
        <TabsContent value="cost" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Cost Analysis</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <CardDescription>Monthly cost breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={[
                  { month: "Jan", TotalCost: 87.45, CostPerMessage: 0.045 },
                  { month: "Feb", TotalCost: 92.18, CostPerMessage: 0.044 },
                  { month: "Mar", TotalCost: 103.24, CostPerMessage: 0.042 },
                  { month: "Apr", TotalCost: 95.67, CostPerMessage: 0.043 },
                  { month: "May", TotalCost: 110.32, CostPerMessage: 0.041 },
                  { month: "Jun", TotalCost: 98.76, CostPerMessage: 0.042 },
                ]}
                index="month"
                categories={["TotalCost", "CostPerMessage"]}
                colors={["rgba(124, 58, 237, 0.7)", "rgba(236, 72, 153, 0.7)"]}
                height={400}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ title, value, description, trend, trendDirection }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          <p className="text-xs text-muted-foreground">{description}</p>
          <p className={`text-xs ml-2 ${trendDirection === "up" ? "text-green-500" : "text-red-500"}`}>{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
}