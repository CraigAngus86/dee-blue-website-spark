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
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-1.5 h-10 bg-[#00105A] mr-3"></div>
          <h3 className="text-lg font-bold text-[#00105A]">Highland League Table</h3>
        </div>
        <Link 
          href="/matches?tab=table" 
          className="text-[#00105A] hover:text-[#FFD700] transition-colors flex items-center gap-2"
        >
          <span className="text-sm font-medium">View Full Table</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-12 items-center">
          {/* Position Circle and Team Name - cols 1-3 */}
          <div className="col-span-3 flex items-center">
            <div className="bg-[#00105A] text-white font-bold h-12 w-12 rounded-full flex items-center justify-center text-xl mr-3">
              {position}
            </div>
            <div className="font-bold text-lg text-[#00105A]">Banks o' Dee</div>
          </div>
          
          {/* Points - cols 4 (aligned with FINAL RESULT card) */}
          <div className="col-span-1 text-center mr-auto">
            <div className="text-2xl font-bold text-[#00105A]">{points}</div>
            <div className="text-xs text-gray-500 uppercase">Points</div>
          </div>
          
          {/* Won/Drawn/Lost Stats - cols 5-8 (aligned with NEXT MATCH card) */}
          <div className="col-span-4 flex justify-center items-center">
            <div className="flex space-x-16">
              <div className="text-center mx-8">
                <div className="text-lg font-medium text-[#00105A]">{won}</div>
                <div className="text-xs text-gray-500 uppercase">Won</div>
              </div>
              
              <div className="text-center mx-8">
                <div className="text-lg font-medium text-[#00105A]">{drawn}</div>
                <div className="text-xs text-gray-500 uppercase">Drawn</div>
              </div>
              
              <div className="text-center mx-8">
                <div className="text-lg font-medium text-[#00105A]">{lost}</div>
                <div className="text-xs text-gray-500 uppercase">Lost</div>
              </div>
            </div>
          </div>
          
          {/* Form Indicators - cols 9-12 (aligned with UPCOMING MATCH card) */}
          <div className="col-span-4 flex flex-col items-center ml-auto">
            <div className="flex space-x-1">
              {form.slice(0, 5).map((result, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white 
                    ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-amber-500' : 'bg-red-500'}`}
                >
                  {result}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 uppercase mt-1">Form</div>
          </div>
        </div>
      </div>
    </div>
  );
}
