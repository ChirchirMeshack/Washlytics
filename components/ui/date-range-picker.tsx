/**
 * @file components/ui/date-range-picker.tsx
 * @description A date range picker component with a popover calendar interface
 * 
 * Features:
 * - Date range selection
 * - Popover calendar interface
 * - Two-month view
 * - Formatted date display
 * - Keyboard navigation support
 */

"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Props for the DatePickerWithRange component
 * 
 * @interface DatePickerWithRangeProps
 * @property {string} [className] - Optional CSS class names
 * @property {DateRange | undefined} date - Currently selected date range
 * @property {(date: DateRange) => void} setDate - Callback to update the selected date range
 */
interface DatePickerWithRangeProps {
  className?: string
  date: DateRange | undefined
  setDate: (date: DateRange) => void
}

/**
 * DatePickerWithRange Component
 * 
 * A date range picker component that displays a button with the selected date range
 * and opens a popover calendar for date selection.
 * 
 * Features:
 * - Displays selected date range in a formatted string
 * - Opens a two-month calendar view in a popover
 * - Supports keyboard navigation
 * - Maintains accessibility standards
 * 
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange>({
 *   from: new Date(),
 *   to: addDays(new Date(), 7)
 * });
 * 
 * <DatePickerWithRange
 *   date={dateRange}
 *   setDate={setDateRange}
 * />
 * ```
 */
export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        {/* Date Range Display Button */}
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                // Show full date range
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                // Show only start date
                format(date.from, "LLL dd, y")
              )
            ) : (
              // Show placeholder
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>

        {/* Calendar Popover */}
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}