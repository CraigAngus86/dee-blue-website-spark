"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface LeaguePositionSummaryProps {
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  form?: ('W' | 'D' | 'L')[];
}

export function LeaguePositionSummary({
  position,
  played,
  won,
  drawn,
  lost,
  points,
  form = []
}: LeaguePositionSummaryProps) {
  return (
    <div className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-[#00105A] p-3 flex justify-between items-center">
        <div className="text-sm font-medium text-white">Highland League Table</div>
        <Link 
          href="/matches?tab=table" 
          className="text-white hover:text-[#FFD700] transition-colors flex items-center space-x-1"
        >
          <span className="text-xs">View Full Table</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-[#00105A] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
            {position}
          </div>
          <div className="font-bold text-lg">Banks o' Dee</div>
        </div>
        
        <div className="grid grid-cols-5 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xl font-bold">{points}</div>
            <div className="text-xs text-gray-500">POINTS</div>
          </div>
          <div className="text-center">
            <div className="text-lg">{played}</div>
            <div className="text-xs text-gray-500">PLAYED</div>
          </div>
          <div className="text-center">
            <div className="text-lg">{won}</div>
            <div className="text-xs text-gray-500">WON</div>
          </div>
          <div className="text-center">
            <div className="text-lg">{drawn}</div>
            <div className="text-xs text-gray-500">DRAWN</div>
          </div>
          <div className="text-center">
            <div className="text-lg">{lost}</div>
            <div className="text-xs text-gray-500">LOST</div>
          </div>
        </div>
        
        {form && form.length > 0 && (
          <div>
            <div className="text-xs text-gray-500 mb-1">FORM</div>
            <div className="flex space-x-1">
              {form.slice(0, 5).map((result, index) => (
                <div 
                  key={index} 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                    result === 'W' ? 'bg-green-500' : 
                    result === 'D' ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
