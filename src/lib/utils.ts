
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs Class names to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 * @param dateString ISO date string
 * @param withTime Include time in the output
 * @returns Formatted date string
 */
export function formatDate(dateString: string, withTime = false): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(withTime && { hour: '2-digit', minute: '2-digit' })
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original if formatting fails
  }
}

/**
 * Truncates text to a maximum length
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Validates if a string is a valid URL
 * @param url URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely accesses a deeply nested object property
 * @param obj Object to access
 * @param path Path to property
 * @param fallback Fallback value
 * @returns Property value or fallback
 */
export function getNestedValue<T>(obj: any, path: string, fallback: T): T {
  return path.split('.').reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : fallback;
  }, obj);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
