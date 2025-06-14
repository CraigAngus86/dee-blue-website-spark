"use client";
import React, { useState } from 'react';
import { MapPin, Car, Bus, ParkingCircle, Ticket, Coffee, Users, Clock, Phone } from 'lucide-react';

export function MobileGettingThere() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'getting-there',
      icon: Car,
      content: (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - EXACT same styling */}
          <div className="bg-gradient-to-r from-[#00105A] to-[#001a7a] px-4 py-1.5 flex items-center">
            <div className="bg-[#FFD700] p-1.5 rounded-md mr-3 flex-shrink-0">
              <Car className="w-4 h-4 text-[#00105A]" />
            </div>
            <h3 className="text-base font-montserrat font-bold text-white leading-none m-0">
              Getting There
            </h3>
          </div>
          
          <div className="p-4">
            {/* Top Section - EXACT same */}
            <div className="border-l-4 border-[#FFD700] pl-3 mb-6 h-12 flex flex-col justify-between">
              <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Stadium Address</h4>
              <p className="text-[#374151] text-xs leading-tight m-0">Spain Park Stadium, Abbotswell Road</p>
              <p className="text-[#6b7280] text-xs leading-tight m-0">Aberdeen AB12 3AB</p>
            </div>
            
            {/* Middle Section - EXACT same yellow background */}
            <div className="bg-[#fefce8] rounded-lg p-3 mb-6 h-28">
              <div className="flex items-center mb-2">
                <Bus className="w-4 h-4 text-[#00105A] mr-2" />
                <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Public Transport</h4>
              </div>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">Route 17: Wellington Road</p>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">Route 59: Abbotswell Road</p>
              <p className="text-[#10b981] text-xs font-medium leading-tight">4-minute walk from stops</p>
            </div>
            
            {/* Bottom Section - EXACT same */}
            <div className="flex items-start h-10">
              <Car className="w-4 h-4 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-[#00105A] text-sm mb-1 leading-tight">By Car</h4>
                <p className="text-[#6b7280] text-xs leading-tight">15 minutes from city center via Torry</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'parking',
      icon: ParkingCircle,
      content: (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - EXACT same styling */}
          <div className="bg-gradient-to-r from-[#00105A] to-[#001a7a] px-4 py-1.5 flex items-center">
            <div className="bg-[#FFD700] p-1.5 rounded-md mr-3 flex-shrink-0">
              <ParkingCircle className="w-4 h-4 text-[#00105A]" />
            </div>
            <h3 className="text-base font-montserrat font-bold text-white leading-none m-0">
              Parking & Access
            </h3>
          </div>
          
          <div className="p-4">
            {/* Top Section - EXACT same */}
            <div className="border-l-4 border-[#10b981] pl-3 mb-6 h-12 flex flex-col justify-between">
              <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Main Car Park</h4>
              <p className="text-[#374151] text-xs leading-tight m-0">200 spaces at stadium</p>
              <p className="text-[#10b981] text-xs leading-tight m-0">FREE parking available</p>
            </div>
            
            {/* Middle Section - EXACT same green background */}
            <div className="bg-[#f0fdf4] rounded-lg p-3 mb-6 h-28">
              <div className="flex items-center mb-2">
                <ParkingCircle className="w-4 h-4 text-[#10b981] mr-2" />
                <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Overflow Parking</h4>
              </div>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">Additional spaces across road</p>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">2-minute walk to stadium</p>
              <p className="text-[#10b981] text-xs font-medium leading-tight">Available on match days</p>
            </div>
            
            {/* Bottom Section - EXACT same */}
            <div className="flex items-start h-10">
              <Users className="w-4 h-4 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-[#00105A] text-sm mb-1 leading-tight">Accessibility</h4>
                <p className="text-[#6b7280] text-xs leading-tight">Disabled parking & wheelchair access</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'stadium-info',
      icon: Ticket,
      content: (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - EXACT same styling */}
          <div className="bg-gradient-to-r from-[#00105A] to-[#001a7a] px-4 py-1.5 flex items-center">
            <div className="bg-[#FFD700] p-1.5 rounded-md mr-3 flex-shrink-0">
              <Ticket className="w-4 h-4 text-[#00105A]" />
            </div>
            <h3 className="text-base font-montserrat font-bold text-white leading-none m-0">
              Stadium Info
            </h3>
          </div>
          
          <div className="p-4">
            {/* Top Section - EXACT same */}
            <div className="border-l-4 border-[#3b82f6] pl-3 mb-6 h-12 flex flex-col justify-between">
              <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Match Day</h4>
              <p className="text-[#374151] text-xs leading-tight m-0">Gates open 2 hours before kick-off</p>
              <p className="text-[#6b7280] text-xs leading-tight m-0">876 total capacity</p>
            </div>
            
            {/* Middle Section - EXACT same blue background */}
            <div className="bg-[#f0f9ff] rounded-lg p-3 mb-6 h-28">
              <div className="flex items-center mb-2">
                <Coffee className="w-4 h-4 text-[#3b82f6] mr-2" />
                <h4 className="font-semibold text-[#00105A] text-sm leading-tight m-0">Facilities</h4>
              </div>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">Food kiosk & refreshments available</p>
              <p className="text-[#6b7280] text-xs leading-tight mb-1">Home & away supporter sections</p>
              <p className="text-[#6b7280] text-xs leading-tight">3G artificial playing surface</p>
            </div>
            
            {/* Bottom Section - EXACT same */}
            <div className="flex items-start h-10">
              <Phone className="w-4 h-4 text-[#FFD700] mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-[#00105A] text-sm mb-1 leading-tight">Match Day Enquiries</h4>
                <p className="text-[#6b7280] text-xs leading-tight">Contact club for assistance</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="py-8">
      {/* Tab Navigation - Icons only for clean mobile look */}
      <div className="flex border-b border-[#e5e7eb] mb-6 mx-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`flex-1 py-3 px-2 transition-all duration-300 min-h-[44px] flex items-center justify-center ${
              activeTab === index 
                ? 'text-[#00105A] border-b-2 border-[#FFD700] bg-[#f8fafc]' 
                : 'text-[#6b7280] hover:text-[#00105A]'
            }`}
          >
            <tab.icon className="w-6 h-6" />
          </button>
        ))}
      </div>

      {/* Tab Content - Exact same card styling preserved */}
      <div className="px-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
