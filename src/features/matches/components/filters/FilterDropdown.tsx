"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FilterDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = ""
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find the selected option
  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Selected value display */}
      <button
        type="button"
        className={cn(
          "w-full px-4 py-2 rounded-md flex justify-between items-center font-body text-sm transition-colors",
          "bg-[rgb(var(--white))] border border-[rgb(var(--medium-gray))]",
          "focus:outline-none focus:ring-2 focus:ring-[rgb(var(--brand-gold))] focus:border-[rgb(var(--brand-black))]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-[rgb(var(--brand-black))]">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-[rgb(var(--gray))]" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 rounded-md overflow-hidden bg-[rgb(var(--white))] border border-[rgb(var(--medium-gray))]"
          style={{ boxShadow: 'var(--shadow-md)' }}
          role="listbox"
        >
          <ul className="py-1 divide-y divide-[rgb(var(--medium-gray))]">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={cn(
                    "px-4 py-2 cursor-pointer flex items-center justify-between transition-colors",
                    isSelected
                      ? "bg-[rgb(var(--brand-gold))] text-[rgb(var(--brand-black))]"
                      : "hover:bg-[rgb(var(--warm-gray))] text-[rgb(var(--brand-black))]"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="h-4 w-4" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
