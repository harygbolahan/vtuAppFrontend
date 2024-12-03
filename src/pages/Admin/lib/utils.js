import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-purple-600 text-white",
  success: "bg-green-600 text-white",
  danger: "bg-red-600 text-white",
  warning: "bg-yellow-600 text-white",
  info: "bg-cyan-600 text-white",
}

