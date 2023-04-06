import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// merging tailwind classNames
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// example: py-2 + px-2 -> p-2
