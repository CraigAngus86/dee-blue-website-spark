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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Find the selected option
  const selectedOption = options.find(option => option.value === value) || options[0];
  
  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Selected value display */}
      <button 
        type="button"
        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#C5E7FF] focus:border-[#00105A]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
          <ul className="py-1 divide-y divide-gray-100">
            {options.map((option) => (
              <li 
                key={option.value}
                className={cn(
                  "px-4 py-2 cursor-pointer flex items-center justify-between",
                  option.value === value ? "bg-[#FFD700]" : "hover:bg-gray-50"
                )}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="h-4 w-4" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
