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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#00105A]">Highland League Table</h3>
        <Link 
          href="/matches?tab=table" 
          className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center gap-1"
        >
          <span className="text-sm">View Full Table</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow-md border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#00105A] rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
              {position}
            </div>
            <div className="font-bold text-xl">Banks o' Dee</div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{points}</div>
              <div className="text-xs text-gray-500 uppercase">Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{played}</div>
              <div className="text-xs text-gray-500 uppercase">Played</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{won}</div>
              <div className="text-xs text-gray-500 uppercase">Won</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{drawn}</div>
              <div className="text-xs text-gray-500 uppercase">Drawn</div>
            </div>
            <div className="text-center">
              <div className="text-lg">{lost}</div>
              <div className="text-xs text-gray-500 uppercase">Lost</div>
            </div>
          </div>
          
          {form && form.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 uppercase mb-2">Form</div>
              <div className="flex space-x-2">
                {form.slice(0, 5).map((result, index) => (
                  <div 
                    key={index} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white ${
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
    </div>
  );
}
