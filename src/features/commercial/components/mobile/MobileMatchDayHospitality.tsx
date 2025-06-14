"use client";
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface MobileMatchDayHospitalityProps {
  onPackageClick: (packageName: string) => void;
}

export function MobileMatchDayHospitality({ onPackageClick }: MobileMatchDayHospitalityProps) {
  const [activePackage, setActivePackage] = useState(0); // 0 = Match Day, 1 = Matchball, 2 = Small Groups

  const packages = [
    {
      name: "Match Day",
      fullName: "Match Day Sponsorship", 
      price: "£1,000",
      headerColor: "from-[#FFD700] to-[#f1c40f]"
    },
    {
      name: "Matchball",
      fullName: "Matchball Sponsorship",
      price: "£800", 
      headerColor: "from-[#C5E7FF] to-[#a3d5ff]"
    },
    {
      name: "Small Groups",
      fullName: "Small Groups",
      price: "£90 per head",
      headerColor: "from-[#f3f4f6] to-[#e5e7eb]"
    }
  ];

  const comparisonData = [
    {
      feature: "Number of Guests",
      values: ["10", "10", "min. 6"]
    },
    {
      feature: "Arrival Time", 
      values: ["2 hours before kick-off", "90 mins before kick-off", "90 mins before kick-off"]
    },
    {
      feature: "Boardroom Access",
      values: [true, false, false]
    },
    {
      feature: "Complimentary Drinks Package",
      values: [true, true, true]
    },
    {
      feature: "Food Service",
      values: ["Three-course meal", "Three-course meal", "Three-course meal"]
    },
    {
      feature: "Saltire Stand Seating",
      values: [true, true, true]
    },
    {
      feature: "Half time Snacks",
      values: [true, true, true]
    },
    {
      feature: "Man of the Match Selection",
      values: [false, true, false]
    },
    {
      feature: "Match Day Promotion",
      values: [true, true, false]
    },
    {
      feature: "Social Media Promotion", 
      values: [true, true, false]
    },
    {
      feature: "Post Match Entertainment",
      values: [true, true, true]
    }
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#00105A] mb-6 font-montserrat">
            Match Day Hospitality
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed">
            Experience matchday in style with our premium hospitality packages, perfect for entertaining 
            clients or enjoying a special day out with family and friends.
          </p>
        </div>

        {/* Mobile Tab Switcher + Two Column Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          {/* Tab Switcher - Spain Park Pattern */}
          <div className="flex border-b border-[#e5e7eb]">
            {packages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setActivePackage(index)}
                className={`flex-1 py-4 px-2 text-center font-semibold transition-all duration-300 min-h-[44px] text-sm ${
                  activePackage === index 
                    ? 'text-[#00105A] border-b-2 border-[#FFD700] bg-[#f8fafc]' 
                    : 'text-[#6b7280] hover:text-[#00105A] hover:bg-[#f9fafb]'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="font-montserrat">{pkg.name}</span>
                  {activePackage === index && (
                    <span className="text-xs text-[#FFD700] mt-1">{pkg.price}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Package Header - Shows Selected Package Details */}
          <div className={`bg-gradient-to-r ${packages[activePackage].headerColor} py-4 px-6 text-center`}>
            <h3 className="font-bold text-[#00105A] text-lg mb-1">
              {packages[activePackage].fullName}
            </h3>
            <p className="text-[#00105A] font-semibold text-xl">
              {packages[activePackage].price}
            </p>
          </div>

          {/* Two Column Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="text-left py-3 px-4 font-semibold text-[#00105A] text-sm">
                    Package Features
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-[#00105A] text-sm">
                    Included
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                    <td className="py-3 px-4 font-medium text-[#00105A] text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.values[activePackage] === 'boolean' ? (
                        row.values[activePackage] ? (
                          <Check className="mx-auto text-[#10b981] h-5 w-5" />
                        ) : (
                          <X className="mx-auto text-[#6b7280] h-5 w-5" />
                        )
                      ) : (
                        <span className="text-[#4b5563] font-medium text-sm">
                          {row.values[activePackage]}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <p className="text-[#6b7280] mb-6">
            Looking to explore our hospitality opportunities further? Our commercial team is here to help.
          </p>
          <button 
            onClick={() => onPackageClick('Match Day Hospitality')}
            className="bg-[#FFD700] text-[#00105A] hover:bg-[#f1c40f] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Discuss Hospitality Options
          </button>
        </div>
      </div>
    </section>
  );
}
