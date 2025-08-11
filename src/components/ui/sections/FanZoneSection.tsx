"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/sections/SectionHeader";

interface FanZoneSectionProps {
  fanOfMonth: any;
}

const FanZoneSection: React.FC<FanZoneSectionProps> = ({ fanOfMonth }) => {
  return (
    <section className="container mx-auto px-4">
      <SectionHeader
        title="Fan Zone"
        subtitle="Celebrating the Baynounah supporters"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {/* Fan of the Month */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent px-6 py-3 text-black">
            <h3 className="text-h3 font-semibold">Fan of the Month</h3>
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
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-h4 font-semibold mb-2">{fanOfMonth.name}</h4>

                  {fanOfMonth.since_year && (
                    <p className="text-text-muted mb-3">
                      <span className="font-medium text-text-strong">Supporting since: </span>
                      {fanOfMonth.since_year}
                    </p>
                  )}

                  {fanOfMonth.location && (
                    <p className="text-text-muted mb-3">
                      <span className="font-medium text-text-strong">Location: </span>
                      {fanOfMonth.location}
                    </p>
                  )}

                  {fanOfMonth.quote && (
                    <div className="mt-4">
                      <blockquote className="italic text-text-strong border-l-4 border-accent pl-4 py-2">
                        “{fanOfMonth.quote}”
                      </blockquote>
                    </div>
                  )}

                  <Link
                    href="/fan-zone/fan-of-the-month"
                    className="inline-block mt-4 text-link hover:text-link-hover font-medium transition-colors"
                    aria-label={`Read ${fanOfMonth.name}'s story`}
                  >
                    Read {fanOfMonth.name}&apos;s story
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-text-muted">
              No current Fan of the Month
            </div>
          )}
        </div>

        {/* Fan Interaction */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="bg-accent px-6 py-3 text-black">
            <h3 className="text-h3 font-semibold">Join the Conversation</h3>
          </div>

          <div className="p-6 flex flex-col h-[calc(100%-3.5rem)]">
            <p className="text-text-strong/80 mb-6">
              Share your match day photos, join fan discussions, and participate in
              polls to have your say on all things Baynounah SC.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <Link
                href="/fan-zone/submit-photos"
                className="bg-light-gray hover:bg-medium-gray transition-colors rounded-md p-4 text-center"
              >
                <h4 className="text-h6 font-semibold mb-2">Submit Photos</h4>
                <p className="text-sm text-text-muted">Share your match day photos</p>
              </Link>

              <Link
                href="/fan-zone/polls"
                className="bg-light-gray hover:bg-medium-gray transition-colors rounded-md p-4 text-center"
              >
                <h4 className="text-h6 font-semibold mb-2">Fan Polls</h4>
                <p className="text-sm text-text-muted">Vote on club matters</p>
              </Link>

              <Link
                href="/fan-zone/become-fan-of-month"
                className="bg-light-gray hover:bg-medium-gray transition-colors rounded-md p-4 text-center sm:col-span-2"
              >
                <h4 className="text-h6 font-semibold mb-2">Become Fan of the Month</h4>
                <p className="text-sm text-text-muted">Submit your story to be featured</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanZoneSection;
