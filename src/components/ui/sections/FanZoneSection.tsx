
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

interface FanZoneSectionProps {
  fanOfMonth: any;
}

const FanZoneSection: React.FC<FanZoneSectionProps> = ({ fanOfMonth }) => {
  return (
    <div className="container mx-auto px-4">
      <SectionHeader 
        title="Fan Zone" 
        subtitle="Celebrating the Banks o' Dee supporters" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Fan of the Month */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary px-6 py-3 text-white">
            <h3 className="text-xl font-semibold">Fan of the Month</h3>
          </div>
          
          {fanOfMonth ? (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {fanOfMonth.image_url && (
                  <div className="w-full sm:w-1/3 aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={fanOfMonth.image_url}
                      alt={fanOfMonth.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold mb-2">{fanOfMonth.name}</h4>
                  
                  {fanOfMonth.since_year && (
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium">Supporting since: </span>
                      {fanOfMonth.since_year}
                    </p>
                  )}
                  
                  {fanOfMonth.location && (
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium">Location: </span>
                      {fanOfMonth.location}
                    </p>
                  )}
                  
                  {fanOfMonth.quote && (
                    <div className="mt-4">
                      <blockquote className="italic text-gray-700 border-l-4 border-primary pl-4 py-2">
                        "{fanOfMonth.quote}"
                      </blockquote>
                    </div>
                  )}
                  
                  <Link 
                    href="/fan-zone/fan-of-the-month" 
                    className="inline-block mt-4 text-primary font-medium hover:underline"
                  >
                    Read {fanOfMonth.name}'s story
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No current Fan of the Month
            </div>
          )}
        </div>
        
        {/* Fan Interaction */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="bg-primary px-6 py-3 text-white">
            <h3 className="text-xl font-semibold">Join the Conversation</h3>
          </div>
          
          <div className="p-6 flex flex-col h-[calc(100%-3.5rem)]">
            <p className="text-gray-700 mb-6">
              Share your match day photos, join fan discussions, and participate in 
              polls to have your say on all things Banks o' Dee FC.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <Link 
                href="/fan-zone/submit-photos" 
                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-4 text-center"
              >
                <h4 className="font-semibold mb-2">Submit Photos</h4>
                <p className="text-sm text-gray-600">Share your match day photos</p>
              </Link>
              
              <Link 
                href="/fan-zone/polls" 
                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-4 text-center"
              >
                <h4 className="font-semibold mb-2">Fan Polls</h4>
                <p className="text-sm text-gray-600">Vote on club matters</p>
              </Link>
              
              <Link 
                href="/fan-zone/become-fan-of-month" 
                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-md p-4 text-center sm:col-span-2"
              >
                <h4 className="font-semibold mb-2">Become Fan of the Month</h4>
                <p className="text-sm text-gray-600">Submit your story to be featured</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanZoneSection;
