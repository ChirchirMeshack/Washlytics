"use client"

import { useTheme } from "next-themes"
import type React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Types
type ChartProps = {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  yAxisWidth?: number
  height?: number
  className?: string
  children?: React.ReactNode
}

type BarChartProps = ChartProps & {
  layout?: "horizontal" | "vertical"
  stack?: boolean
}

type PieChartProps = {
  data: any[]
  category: string
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  height?: number
  className?: string
  children?: React.ReactNode
}

// Helper functions
const getDefaultColors = (theme: string | undefined, count: number) => {
  const isDark = theme === "dark"

  // Base colors for light and dark themes
  const baseColors = isDark
    ? ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316", "#f59e0b", "#6366f1"]
    : ["#2563eb", "#7c3aed", "#db2777", "#059669", "#ea580c", "#d97706", "#4f46e5"]

  // If we have enough colors, return them
  if (baseColors.length >= count) {
    return baseColors.slice(0, count)
  }

  // Otherwise, generate additional colors by adding opacity
  const result = [...baseColors]
  const opacities = [0.8, 0.6, 0.4]

  let opacityIndex = 0
  let colorIndex = 0

  while (result.length < count) {
    const baseColor = baseColors[colorIndex % baseColors.length]
    const opacity = opacities[opacityIndex % opacities.length]

    // Convert hex to rgba
    const r = Number.parseInt(baseColor.slice(1, 3), 16)
    const g = Number.parseInt(baseColor.slice(3, 5), 16)
    const b = Number.parseInt(baseColor.slice(5, 7), 16)

    result.push(`rgba(${r}, ${g}, ${b}, ${opacity})`)

    colorIndex++
    if (colorIndex % baseColors.length === 0) {
      opacityIndex++
    }
  }

  return result.slice(0, count)
}

const defaultValueFormatter = (value: number) => {
  return value.toString()
}

// Chart components
export function AreaChart({
  data,
  index,
  categories,
  colors,
  valueFormatter = defaultValueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 56,
  height = 300,
  className = "",
}: ChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartColors = colors || getDefaultColors(theme, categories.length)

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGridLines && (
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
              axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              tickFormatter={valueFormatter}
              tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
              axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
            />
          )}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null

              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{label}</div>
                  {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.name}:</span>
                      <span>{valueFormatter(item.value as number)}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          {showLegend && <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "12px" }} />}
          {categories.map((category, index) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              fill={chartColors[index % chartColors.length]}
              stroke={chartColors[index % chartColors.length]}
              fillOpacity={0.3}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter = defaultValueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  layout = "horizontal",
  stack = false,
  yAxisWidth = 56,
  height = 300,
  className = "",
}: BarChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartColors = colors || getDefaultColors(theme, categories.length)

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} layout={layout} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGridLines && (
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
          )}
          {showXAxis &&
            (layout === "horizontal" ? (
              <XAxis
                dataKey={index}
                tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
                axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
                tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              />
            ) : (
              <XAxis
                type="number"
                tickFormatter={valueFormatter}
                tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
                axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
                tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              />
            ))}
          {showYAxis &&
            (layout === "horizontal" ? (
              <YAxis
                width={yAxisWidth}
                tickFormatter={valueFormatter}
                tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
                axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
                tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              />
            ) : (
              <YAxis
                dataKey={index}
                type="category"
                width={yAxisWidth}
                tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
                axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
                tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              />
            ))}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null

              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{label}</div>
                  {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.name}:</span>
                      <span>{valueFormatter(item.value as number)}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          {showLegend && <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "12px" }} />}
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              fill={chartColors[index % chartColors.length]}
              stackId={stack ? "stack" : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors,
  valueFormatter = defaultValueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  yAxisWidth = 56,
  height = 300,
  className = "",
}: ChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartColors = colors || getDefaultColors(theme, categories.length)

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGridLines && (
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
          )}
          {showXAxis && (
            <XAxis
              dataKey={index}
              tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
              axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
            />
          )}
          {showYAxis && (
            <YAxis
              width={yAxisWidth}
              tickFormatter={valueFormatter}
              tick={{ fill: isDark ? "#a3a3a3" : "#525252" }}
              axisLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
              tickLine={{ stroke: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)" }}
            />
          )}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null

              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="font-medium">{label}</div>
                  {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.name}:</span>
                      <span>{valueFormatter(item.value as number)}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          {showLegend && <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "12px" }} />}
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={chartColors[index % chartColors.length]}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PieChart({
  data,
  category,
  index,
  colors,
  valueFormatter = defaultValueFormatter,
  showLegend = true,
  height = 300,
  className = "",
}: PieChartProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const chartColors = colors || getDefaultColors(theme, data.length)

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || payload.length === 0) return null

              const data = payload[0]
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="font-medium">{data.name}:</span>
                    <span>{valueFormatter(data.value as number)}</span>
                  </div>
                </div>
              )
            }}
          />
          {showLegend && <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: "12px" }} />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Chart tooltip component for custom tooltips
export function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter = defaultValueFormatter,
  children,
}: {
  active?: boolean
  payload?: any[]
  label?: string
  valueFormatter?: (value: number) => string
  children?: React.ReactNode
}) {
  if (!active || !payload || payload.length === 0) return null

  if (children) {
    return <div className="rounded-lg border bg-background p-2 shadow-sm">{children}</div>
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="font-medium">{label}</div>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="font-medium">{item.name}:</span>
          <span>{valueFormatter(item.value as number)}</span>
        </div>
      ))}
    </div>
  )
}

