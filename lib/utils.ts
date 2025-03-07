/**
 * @file lib/utils.ts
 * @description Utility function for managing class names with Tailwind CSS support
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names using clsx and tailwind-merge
 * This utility ensures proper class name merging and handles Tailwind CSS classes correctly
 * 
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}