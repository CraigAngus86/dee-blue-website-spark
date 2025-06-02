"use client";
import React from 'react';
import { Check, X, Crown, Award, Users } from 'lucide-react';

interface MatchDayHospitalityProps {
  onPackageClick: (packageName: string) => void;
}

export function MatchDayHospitality({ onPackageClick }: MatchDayHospitalityProps) {
  const comparisonData = [
    {
      feature: "Number of Guests",
      matchDay: "10",
      matchBall: "10", 
      standard: "1"
    },
    {
      feature: "Arrival Time",
      matchDay: "2 hours before kick-off",
      matchBall: "90 mins before kick-off",
      standard: "1 hour before kick-off"
    },
    {
      feature: "Complimentary Drinks Package",
      matchDay: true,
      matchBall: true,
      standard: false
    },
    {
      feature: "Food Service", 
      matchDay: "Three-course meal",
      matchBall: "Two-course meal",
      standard: "One-course meal"
    },
    {
      feature: "Boardroom Access",
      matchDay: true,
      matchBall: false,
      standard: false
    },
    {
      feature: "Man of the Match Selection",
      matchDay: true,
      matchBall: true,
      standard: false
    },
    {
      feature: "Programme Recognition",
      matchDay: true,
      matchBall: true,
      standard: false
    },
    {
      feature: "Social Media Promotion",
      matchDay: true,
      matchBall: true,
      standard: false
    }
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00105A] mb-6 font-montserrat">
            Match Day Hospitality
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-lg text-[#4b5563] max-w-3xl mx-auto leading-relaxed">
            Experience matchday in style with our premium hospitality packages, perfect for entertaining 
            clients or enjoying a special day out with family and friends.
          </p>
        </div>

        {/* Enhanced Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {/* Package Header Cards - Integrated with Table */}
                <tr>
                  <th className="bg-[#00105A] text-left py-6 px-6 font-semibold text-white">
                    Package Features
                  </th>
                  {/* Match Day Sponsorship - Premium Package */}
                  <th className="bg-gradient-to-br from-[#FFD700] to-[#f1c40f] text-center py-6 px-6 relative">
                    <div className="flex flex-col items-center">
                      <Crown className="h-8 w-8 text-[#00105A] mb-2" />
                      <div className="font-bold text-[#00105A] text-lg mb-1">Match Day Sponsorship</div>
                      <div className="text-[#00105A] font-semibold text-xl">£1,000</div>
                      <div className="text-[#00105A] text-sm font-medium">for 10 people</div>
                    </div>
                  </th>
                  {/* Matchball Sponsorship - Premium Package */}
                  <th className="bg-gradient-to-br from-[#C5E7FF] to-[#a3d5ff] text-center py-6 px-6 relative">
                    <div className="flex flex-col items-center">
                      <Award className="h-8 w-8 text-[#00105A] mb-2" />
                      <div className="font-bold text-[#00105A] text-lg mb-1">Matchball Sponsorship</div>
                      <div className="text-[#00105A] font-semibold text-xl">£800</div>
                      <div className="text-[#00105A] text-sm font-medium">for 10 people</div>
                    </div>
                  </th>
                  {/* Standard Hospitality */}
                  <th className="bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] text-center py-6 px-6 relative">
                    <div className="flex flex-col items-center">
                      <Users className="h-8 w-8 text-[#00105A] mb-2" />
                      <div className="font-bold text-[#00105A] text-lg mb-1">Standard Hospitality</div>
                      <div className="text-[#00105A] font-semibold text-xl">£90</div>
                      <div className="text-[#00105A] text-sm font-medium">per head</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#f9fafb]" : "bg-white"}>
                    <td className="py-4 px-6 font-medium text-[#00105A]">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.matchDay === 'boolean' ? (
                        row.matchDay ? (
                          <Check className="mx-auto text-[#10b981] h-6 w-6" />
                        ) : (
                          <X className="mx-auto text-[#6b7280] h-6 w-6" />
                        )
                      ) : (
                        <span className="text-[#4b5563] font-medium">{row.matchDay}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.matchBall === 'boolean' ? (
                        row.matchBall ? (
                          <Check className="mx-auto text-[#10b981] h-6 w-6" />
                        ) : (
                          <X className="mx-auto text-[#6b7280] h-6 w-6" />
                        )
                      ) : (
                        <span className="text-[#4b5563] font-medium">{row.matchBall}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="mx-auto text-[#10b981] h-6 w-6" />
                        ) : (
                          <X className="mx-auto text-[#6b7280] h-6 w-6" />
                        )
                      ) : (
                        <span className="text-[#4b5563] font-medium">{row.standard}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Single CTA */}
        <div className="text-center mt-12">
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
