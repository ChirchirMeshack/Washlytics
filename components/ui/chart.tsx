"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

// Define chart types
type ChartType = "line" | "bar" | "doughnut" | "pie" | "area"

// Define chart props
interface ChartProps {
  type: ChartType
  data: ChartData<any>
  options?: ChartOptions<any>
  height?: number
  width?: number
  className?: string
}

// Main Chart component
export function Chart({ type, data, options, height, width, className }: ChartProps) {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS>(null)
  const [chartData, setChartData] = useState<ChartData<any>>(data)

  // Update chart colors based on theme
  useEffect(() => {
    if (!data) return

    const isDark = theme === "dark"
    const updatedData = { ...data }

    // Update colors based on chart type
    if (type === "line" || type === "bar" || type === "area") {
      if (updatedData.datasets) {
        updatedData.datasets = updatedData.datasets.map((dataset: any, index: number) => {
          const colors = getColors(index, isDark)

          // For area charts, add fill and background opacity
          if (type === "area" && !dataset.fill) {
            return {
              ...dataset,
              borderColor: colors.borderColor,
              backgroundColor: colors.backgroundColorWithOpacity,
              hoverBackgroundColor: colors.hoverColorWithOpacity,
              fill: true,
              tension: 0.4,
            }
          }

          return {
            ...dataset,
            borderColor: colors.borderColor,
            backgroundColor: colors.backgroundColor,
            hoverBackgroundColor: colors.hoverColor,
          }
        })
      }
    } else if (type === "doughnut" || type === "pie") {
      if (updatedData.datasets) {
        updatedData.datasets = updatedData.datasets.map((dataset: any) => {
          return {
            ...dataset,
            backgroundColor: generateColorArray(dataset.data.length, isDark ? 0.7 : 0.5),
            borderColor: isDark ? "#374151" : "#f3f4f6",
          }
        })
      }
    }

    setChartData(updatedData)
  }, [data, theme, type])

  // Default options based on theme
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "dark" ? "#e5e7eb" : "#374151",
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        titleColor: theme === "dark" ? "#e5e7eb" : "#111827",
        bodyColor: theme === "dark" ? "#d1d5db" : "#374151",
        borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: "600",
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        displayColors: true,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
      },
    },
    scales:
      type === "line" || type === "bar" || type === "area"
        ? {
            x: {
              grid: {
                color: theme === "dark" ? "#374151" : "#e5e7eb",
                drawBorder: false,
              },
              ticks: {
                color: theme === "dark" ? "#9ca3af" : "#6b7280",
                font: {
                  family: "'Inter', sans-serif",
                  size: 11,
                },
              },
            },
            y: {
              grid: {
                color: theme === "dark" ? "#374151" : "#e5e7eb",
                drawBorder: false,
              },
              ticks: {
                color: theme === "dark" ? "#9ca3af" : "#6b7280",
                font: {
                  family: "'Inter', sans-serif",
                  size: 11,
                },
                callback: (value) => {
                  // Format large numbers with k, m, b suffixes
                  if (typeof value === "number") {
                    if (value >= 1000000000) {
                      return (value / 1000000000).toFixed(1) + "B"
                    }
                    if (value >= 1000000) {
                      return (value / 1000000).toFixed(1) + "M"
                    }
                    if (value >= 1000) {
                      return (value / 1000).toFixed(1) + "K"
                    }
                    return value
                  }
                  return value
                },
              },
              beginAtZero: true,
            },
          }
        : undefined,
  }

  // Merge default options with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  // Helper function to get colors based on index and theme
  function getColors(index: number, isDark: boolean) {
    const colorSets = [
      {
        light: {
          borderColor: "rgba(59, 130, 246, 0.8)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          backgroundColorWithOpacity: "rgba(59, 130, 246, 0.1)",
          hoverColor: "rgba(59, 130, 246, 0.3)",
          hoverColorWithOpacity: "rgba(59, 130, 246, 0.2)",
        },
        dark: {
          borderColor: "rgba(96, 165, 250, 0.8)",
          backgroundColor: "rgba(96, 165, 250, 0.2)",
          backgroundColorWithOpacity: "rgba(96, 165, 250, 0.1)",
          hoverColor: "rgba(96, 165, 250, 0.3)",
          hoverColorWithOpacity: "rgba(96, 165, 250, 0.2)",
        },
      },
      {
        light: {
          borderColor: "rgba(16, 185, 129, 0.8)",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          backgroundColorWithOpacity: "rgba(16, 185, 129, 0.1)",
          hoverColor: "rgba(16, 185, 129, 0.3)",
          hoverColorWithOpacity: "rgba(16, 185, 129, 0.2)",
        },
        dark: {
          borderColor: "rgba(52, 211, 153, 0.8)",
          backgroundColor: "rgba(52, 211, 153, 0.2)",
          backgroundColorWithOpacity: "rgba(52, 211, 153, 0.1)",
          hoverColor: "rgba(52, 211, 153, 0.3)",
          hoverColorWithOpacity: "rgba(52, 211, 153, 0.2)",
        },
      },
      {
        light: {
          borderColor: "rgba(249, 115, 22, 0.8)",
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          backgroundColorWithOpacity: "rgba(249, 115, 22, 0.1)",
          hoverColor: "rgba(249, 115, 22, 0.3)",
          hoverColorWithOpacity: "rgba(249, 115, 22, 0.2)",
        },
        dark: {
          borderColor: "rgba(251, 146, 60, 0.8)",
          backgroundColor: "rgba(251, 146, 60, 0.2)",
          backgroundColorWithOpacity: "rgba(251, 146, 60, 0.1)",
          hoverColor: "rgba(251, 146, 60, 0.3)",
          hoverColorWithOpacity: "rgba(251, 146, 60, 0.2)",
        },
      },
      {
        light: {
          borderColor: "rgba(217, 70, 239, 0.8)",
          backgroundColor: "rgba(217, 70, 239, 0.2)",
          backgroundColorWithOpacity: "rgba(217, 70, 239, 0.1)",
          hoverColor: "rgba(217, 70, 239, 0.3)",
          hoverColorWithOpacity: "rgba(217, 70, 239, 0.2)",
        },
        dark: {
          borderColor: "rgba(232, 121, 249, 0.8)",
          backgroundColor: "rgba(232, 121, 249, 0.2)",
          backgroundColorWithOpacity: "rgba(232, 121, 249, 0.1)",
          hoverColor: "rgba(232, 121, 249, 0.3)",
          hoverColorWithOpacity: "rgba(232, 121, 249, 0.2)",
        },
      },
      {
        light: {
          borderColor: "rgba(234, 88, 12, 0.8)",
          backgroundColor: "rgba(234, 88, 12, 0.2)",
          backgroundColorWithOpacity: "rgba(234, 88, 12, 0.1)",
          hoverColor: "rgba(234, 88, 12, 0.3)",
          hoverColorWithOpacity: "rgba(234, 88, 12, 0.2)",
        },
        dark: {
          borderColor: "rgba(251, 146, 60, 0.8)",
          backgroundColor: "rgba(251, 146, 60, 0.2)",
          backgroundColorWithOpacity: "rgba(251, 146, 60, 0.1)",
          hoverColor: "rgba(251, 146, 60, 0.3)",
          hoverColorWithOpacity: "rgba(251, 146, 60, 0.2)",
        },
      },
    ]

    const colorIndex = index % colorSets.length
    return isDark ? colorSets[colorIndex].dark : colorSets[colorIndex].light
  }

  // Generate an array of colors for pie/doughnut charts
  function generateColorArray(count: number, opacity = 0.7) {
    const baseColors = [
      `rgba(59, 130, 246, ${opacity})`, // Blue
      `rgba(16, 185, 129, ${opacity})`, // Green
      `rgba(249, 115, 22, ${opacity})`, // Orange
      `rgba(217, 70, 239, ${opacity})`, // Purple
      `rgba(234, 88, 12, ${opacity})`, // Amber
      `rgba(239, 68, 68, ${opacity})`, // Red
      `rgba(20, 184, 166, ${opacity})`, // Teal
      `rgba(168, 85, 247, ${opacity})`, // Violet
      `rgba(245, 158, 11, ${opacity})`, // Yellow
      `rgba(6, 182, 212, ${opacity})`, // Cyan
    ]

    // If we need more colors than in our base array, generate them
    if (count <= baseColors.length) {
      return baseColors.slice(0, count)
    }

    const colors = [...baseColors]
    for (let i = baseColors.length; i < count; i++) {
      // Generate random colors for additional items
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      colors.push(`rgba(${r}, ${g}, ${b}, ${opacity})`)
    }

    return colors
  }

  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case "line":
      case "area":
        return (
          <Line
            ref={chartRef as React.RefObject<ChartJS<"line">>}
            data={chartData}
            options={mergedOptions as ChartOptions<"line">}
            height={height}
            width={width}
          />
        )
      case "bar":
        return (
          <Bar
            ref={chartRef as React.RefObject<ChartJS<"bar">>}
            data={chartData}
            options={mergedOptions as ChartOptions<"bar">}
            height={height}
            width={width}
          />
        )
      case "doughnut":
        return (
          <Doughnut
            ref={chartRef as React.RefObject<ChartJS<"doughnut">>}
            data={chartData}
            options={mergedOptions as ChartOptions<"doughnut">}
            height={height}
            width={width}
          />
        )
      case "pie":
        return (
          <Pie
            ref={chartRef as React.RefObject<ChartJS<"pie">>}
            data={chartData}
            options={mergedOptions as ChartOptions<"pie">}
            height={height}
            width={width}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`chart-container ${className || ""}`}
      style={{
        height: height || 300,
        width: width || "100%",
      }}
    >
      {renderChart()}
    </div>
  )
}

// Specialized chart components
export const LineChart = (props: Omit<ChartProps, "type">) => <Chart type="line" {...props} />

export const BarChart = (props: Omit<ChartProps, "type">) => <Chart type="bar" {...props} />

export const PieChart = (props: Omit<ChartProps, "type">) => <Chart type="pie" {...props} />

export const PieChartComponent = PieChart

export const DoughnutChart = (props: Omit<ChartProps, "type">) => <Chart type="doughnut" {...props} />

export const AreaChart = (props: Omit<ChartProps, "type">) => <Chart type="area" {...props} />

// Export the Chart component as default
export default Chart

