"use client";
import React, { useState, useMemo } from "react";
import SectionHeader from "@/components/ui/sections/SectionHeader";
import FanSubmissionModal from "./FanSubmissionModal";
import PhotoUploadModal from "./PhotoUploadModal";
import PollCard from "./PollCard";
import FanZoneMobile from "./FanZoneMobile";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, Camera } from "lucide-react";

// Constants extracted for maintainability
const CLOUDINARY_BASE = "https://res.cloudinary.com/dlkpaw2a0/image/upload/";
const CLOUDINARY_TRANSFORMS = {
  gallery: "g_auto:faces,c_fill,ar_5:4,q_auto:good,f_auto,e_sharpen,w_500,h_400",
  fanOfMonth: "g_auto:faces,c_fill,ar_4:3,q_auto:best,f_auto,e_sharpen,w_640,h_480",
  fanPhoto: "g_auto:faces,c_fill,ar_3:4,q_auto:good,f_auto,w_96,h_128",
} as const;

// Static stats - Update these as needed
const SOCIAL_STATS = {
  platformFollowers: "23.7K", // Combined total across all platforms
  totalPosts: "4,892",        // Total posts across history
  pollResponses: "1,247",     // Total poll participation
  lastUpdated: "Aug 12, 2025" // Today's date
} as const;

// Real Baynounah social media URLs
const SOCIAL_LINKS = [
  { 
    name: 'Instagram', 
    Icon: Instagram, 
    url: 'https://www.instagram.com/baynounahsc/',
    hoverClass: 'hover:text-pink-500'
  },
  { 
    name: 'X (Twitter)', 
    Icon: Twitter, 
    url: 'https://x.com/baynounahsc',
    hoverClass: 'hover:text-sky-500'
  },
  { 
    name: 'Facebook', 
    Icon: Facebook, 
    url: 'https://www.facebook.com/BaynounahSC/',
    hoverClass: 'hover:text-blue-600'
  },
  { 
    name: 'YouTube', 
    Icon: Youtube, 
    url: 'https://www.youtube.com/channel/UCXiba2uCfhFI_PYJiiExavA',
    hoverClass: 'hover:text-red-600'
  },
] as const;

interface FanZoneSectionProps {
  fanOfMonth?: any;
  galleryPhotos?: any[];
  activePoll?: any;
}

export default function FanZoneSection(props: FanZoneSectionProps) {
  return (
    <>
      <div className="hidden md:block">
        <FanZoneDesktop {...props} />
      </div>
      <div className="block md:hidden">
        <FanZoneMobile {...props} />
      </div>
    </>
  );
}

function FanZoneDesktop({
  fanOfMonth,
  galleryPhotos = [],
  activePoll,
}: FanZoneSectionProps) {
  const [fanSubmissionModalOpen, setFanSubmissionModalOpen] = useState(false);
  const [photoUploadModalOpen, setPhotoUploadModalOpen] = useState(false);

  // Memoized helpers
  const buildCloudinaryUrl = useMemo(
    () => (publicId: string, type: keyof typeof CLOUDINARY_TRANSFORMS = "gallery") => 
      `${CLOUDINARY_BASE}${CLOUDINARY_TRANSFORMS[type]}/${publicId}`,
    []
  );

  const getStoryExcerpt = (story: string, maxWords = 40): string => {
    if (!story) return "";
    const words = story.split(" ");
    return words.length <= maxWords 
      ? story 
      : `${words.slice(0, maxWords).join(" ")}…`;
  };

  const formatCategory = (category: string): string => {
    return category?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "";
  };

  return (
    <section
      className="bg-white rounded-lg shadow-sm border border-separator overflow-hidden"
      aria-label="Fan Zone"
    >
      {/* Subtle top border accent */}
      <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-gold/50 to-brand-gold" />
      
      <div className="p-6">
        <SectionHeader 
          title="Fan Zone" 
          align="left" 
          className="justify-start md:justify-between"
        />

        {/* Cards Grid with stagger animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          
          {/* Fan of the Month - Enhanced card */}
          <div className="group bg-white rounded-xl border border-separator shadow-sm hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 overflow-hidden">
            <div className="h-[88px] flex items-center justify-between px-6 border-b border-separator bg-gradient-to-r from-white to-[#F8F6F3]">
              <div className="flex items-center">
                <div className="w-1 h-10 bg-brand-gold rounded-sm mr-4" />
                <div>
                  <h3 className="text-h4 font-heading text-black tracking-tightest leading-none m-0">
                    Fan of the Month
                  </h3>
                  <p className="text-small text-dark-gray leading-none m-0 mt-1">
                    Featured Supporter
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFanSubmissionModalOpen(true)}
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-black border-2 border-brand-gold px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-black hover:text-brand-gold hover:border-black hover:scale-105"
              >
                Submit Story
              </button>
            </div>

            {fanOfMonth ? (
              <div className="relative h-[392px] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                  {fanOfMonth.photos?.[0]?.public_id ? (
                    <img
                      src={buildCloudinaryUrl(fanOfMonth.photos[0].public_id, "fanOfMonth")}
                      alt={fanOfMonth.fanName ?? "Featured fan"}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-light-gray to-medium-gray" />
                  )}
                </div>
                
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-h4 font-body mb-2 drop-shadow-lg">
                    {fanOfMonth.fanName}
                  </h4>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full bg-brand-gold text-brand-black text-sm font-semibold px-3 py-1 shadow-md">
                      {formatCategory(fanOfMonth.category)}
                    </span>
                    {fanOfMonth.supporterSince && (
                      <span className="text-small text-white/90 drop-shadow">
                        Since {fanOfMonth.supporterSince}
                      </span>
                    )}
                  </div>
                  <p className="text-small leading-relaxed text-white/95 drop-shadow">
                    {getStoryExcerpt(fanOfMonth.story)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[392px] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-white to-[#F8F6F3]">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold/70 text-black flex items-center justify-center mb-4 shadow-lg animate-pulse">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 className="text-h5 font-body text-black mb-2">
                  Become our first featured fan
                </h4>
                <p className="text-small text-dark-gray max-w-xs">
                  Share your Baynounah story and be featured on our website
                </p>
              </div>
            )}
          </div>

          <PollCard activePoll={activePoll} />
        </div>

        {/* Fan Gallery - Enhanced */}
        <div className="mb-8">
          <SectionHeader 
            title="Fan Gallery" 
            align="left"
            className="justify-start md:justify-between mb-6"
            rightSlot={
              <div className="flex gap-3">                
                <button
                  onClick={() => setPhotoUploadModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-brand-gold text-brand-black border-2 border-brand-gold px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-black hover:text-brand-gold hover:border-black hover:scale-105"
                >
                  <Camera className="w-4 h-4" aria-hidden="true" />
                  Upload Photo
                </button>
              </div>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryPhotos.length > 0
              ? galleryPhotos.slice(0, 4).map((photo, idx) => (
                  <figure
                    key={idx}
                    className="group relative aspect-[5/4] bg-white rounded-xl border border-separator shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {photo.photo?.public_id ? (
                      <>
                        <img
                          src={buildCloudinaryUrl(photo.photo.public_id, "gallery")}
                          alt={photo.context || `Photo by ${photo.fanName || "fan"}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-gray to-medium-gray text-dark-gray">
                        <Camera className="w-8 h-8 opacity-50" />
                      </div>
                    )}
                    
                    <figcaption className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium">
                      By {photo.fanName ?? "Fan"}
                    </figcaption>
                  </figure>
                ))
              : Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className="relative aspect-[5/4] bg-gradient-to-br from-white to-[#F8F6F3] rounded-xl border border-separator shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 hover:translate-y-[-2px] flex items-center justify-center text-dark-gray"
                  >
                    <Camera className="w-8 h-8 opacity-30" />
                  </div>
                ))}
          </div>
        </div>

        {/* ENHANCED Social Engagement Section */}
        <div className="relative overflow-hidden rounded-xl border-2 border-separator hover:border-brand-gold shadow-sm transition-all duration-300 group cursor-pointer" 
             style={{background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F6F3 100%)'}}>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, #FCC743 35px, #FCC743 36px)`,
            }} />
          </div>
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-h5 font-heading text-black tracking-tightest">
                  Join Our Community
                </h4>
                <p className="text-small text-dark-gray mt-1">
                  Be part of the Baynounah family
                </p>
              </div>
              
              {/* Updated date indicator */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-gold"></span>
                </span>
                <span className="text-xs font-medium text-dark-gray">
                  Updated {SOCIAL_STATS.lastUpdated}
                </span>
              </div>
            </div>
            
            {/* Updated Stats Bar with new categories */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-separator group-hover:border-brand-gold/30 transition-colors">
                <div className="text-h5 font-heading text-brand-gold">
                  {SOCIAL_STATS.platformFollowers}
                </div>
                <div className="text-xs text-dark-gray">Platform Followers</div>
              </div>
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-separator group-hover:border-brand-gold/30 transition-colors">
                <div className="text-h5 font-heading text-brand-gold">
                  {SOCIAL_STATS.totalPosts}
                </div>
                <div className="text-xs text-dark-gray">Total Posts</div>
              </div>
              <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-separator group-hover:border-brand-gold/30 transition-colors">
                <div className="text-h5 font-heading text-brand-gold">
                  {SOCIAL_STATS.pollResponses}
                </div>
                <div className="text-xs text-dark-gray">Poll Responses</div>
              </div>
            </div>
            
            {/* Bottom Row with hashtags and social icons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-full shadow-sm">
                  #BaynounahSC
                </span>
                <span className="px-3 py-1.5 bg-brand-gold text-black text-xs font-medium rounded-full shadow-sm">
                  #BePartOfTheJourney
                </span>
              </div>
              
              {/* Social Icons with professional icons */}
              <div className="flex gap-2">
                {SOCIAL_LINKS.map(({ name, Icon, url, hoverClass }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 bg-white/80 backdrop-blur-sm border border-separator rounded-lg flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold hover:scale-110 transition-all duration-200 group/icon ${hoverClass}`}
                    aria-label={`Follow us on ${name}`}
                  >
                    <Icon className="w-4 h-4 text-black transition-colors group-hover/icon:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FanSubmissionModal
        isOpen={fanSubmissionModalOpen}
        onClose={() => setFanSubmissionModalOpen(false)}
      />
      <PhotoUploadModal
        isOpen={photoUploadModalOpen}
        onClose={() => setPhotoUploadModalOpen(false)}
      />
    </section>
  );
}