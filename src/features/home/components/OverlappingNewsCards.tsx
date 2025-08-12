"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NewsArticle } from "@/features/news/types";
import { NewsCard, NewsModal } from "@/features/news/components";
import { MatchGalleryModal } from "@/features/galleries";
import { cn } from "@/lib/utils";

interface OverlappingNewsCardsProps {
  articles: (NewsArticle & { contentType?: string })[];
  className?: string;
}

const STAGGER_MS = 400; // slower spacing between each card fade-up

const OverlappingNewsCards: React.FC<OverlappingNewsCardsProps> = ({
  articles,
  className,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);   // hydration gate
  const [visible, setVisible] = useState(false);   // trigger reveal

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reveal if already scrolled, or on first scroll/wheel/touchstart
  useEffect(() => {
    if (typeof window === "undefined" || visible) return;

    if (window.scrollY > 0) {
      setVisible(true);
      return;
    }

    const onFirst = () => setVisible(true);

    window.addEventListener("scroll", onFirst, { passive: true, once: true, capture: true });
    window.addEventListener("wheel", onFirst as any, { passive: true, once: true, capture: true });
    window.addEventListener("touchstart", onFirst as any, { passive: true, once: true, capture: true });

    return () => {
      window.removeEventListener("scroll", onFirst, { capture: true } as any);
      window.removeEventListener("wheel", onFirst as any, { capture: true } as any);
      window.removeEventListener("touchstart", onFirst as any, { capture: true } as any);
    };
  }, [visible]);

  if (!articles || articles.length === 0) return null;

  const handleContentClick = useCallback(
    async (content: NewsArticle & { contentType?: string }) => {
      try {
        setIsLoading(true);

        if (content.contentType === "gallery") {
          setSelectedGalleryId(content.id);
          return;
        }

        if (Array.isArray(content.body) && content.body.length > 0) {
          setSelectedArticle(content);
          return;
        }

        const response = await fetch(`/api/sanity-test/news?slug=${encodeURIComponent(content.slug)}`);
        if (!response.ok) throw new Error("Failed to fetch article");

        const data = await response.json();
        if (data.success && data.data) {
          setSelectedArticle(data.data);
        } else {
          setSelectedArticle(content);
        }
      } catch (error) {
        console.error("Error handling content click:", error);
        if (content.contentType === "gallery") setSelectedGalleryId(content.id);
        else setSelectedArticle(content);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const delays = useMemo(() => articles.map((_, i) => i), [articles]);

  return (
    <section
      className="section--white bg-[rgb(var(--white))] py-12 sm:py-14 md:py-16 relative z-30"
      aria-label="Latest stories and galleries"
    >
      {/* Subtle gold grid bg, tokenized */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(var(--brand-gold)/0.5) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--brand-gold)/0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Overlap offset under the hero — raised higher */}
      <div
        className={cn(
          "container mx-auto px-4 relative z-30",
          // increased negative margins to pull cards further into the hero
          "-mt-32 sm:-mt-40 md:-mt-56 lg:-mt-64",
          className
        )}
      >
        <div
          ref={gridRef}
          className="fade-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          data-mounted={mounted ? "true" : "false"}
          data-visible={visible ? "true" : "false"}
          style={{ visibility: mounted ? "visible" : "hidden" }}
        >
          {articles.map((content, i) => (
            <div
              key={content.id}
              className={cn(
                "fade-card group h-full rounded-lg overflow-hidden outline-none",
                "ring-1 ring-[rgb(var(--brand-black)/0.12)] ring-offset-0",
                "transition-transform duration-200", // only transform, not opacity
                "hover:-translate-y-0.5 hover:shadow-[var(--card-shadow)]",
                "focus-within:ring-2 focus-within:ring-[rgb(var(--brand-gold))]"
              )}
              style={
                {
                  transitionDelay: `calc(var(--stagger, ${delays[i]}) * ${STAGGER_MS}ms)`,
                  ["--stagger" as any]: delays[i],
                } as React.CSSProperties
              }
            >
              <NewsCard
                article={content}
                onClick={handleContentClick}
                className="h-full group-hover:ring-2 group-hover:ring-[rgb(var(--brand-gold))]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* News Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Gallery Modal */}
      {selectedGalleryId && (
        <MatchGalleryModal
          galleryId={selectedGalleryId}
          isOpen={!!selectedGalleryId}
          onClose={() => setSelectedGalleryId(null)}
        />
      )}

      {/* Loading indicator (tokenized) */}
      {isLoading && (
        <div
          className="fixed inset-0 bg-[rgb(var(--brand-black))]/50 flex items-center justify-center z-[300]"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="bg-[rgb(var(--white))] px-4 py-3 rounded-lg shadow-lg text-[rgb(var(--brand-black))]">
            <div className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-[rgb(var(--brand-gold))]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-sm">
                Loading {selectedGalleryId ? "gallery" : "article"}…
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Animation styles */}
      <style jsx>{`
        /* Start hidden SSR to avoid flash */
        .fade-card {
          opacity: 0;
          transform: translateY(12px);
          transition: none; /* no transition before hydration */
          will-change: opacity, transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* After hydration, set up the transition (still hidden) */
        .fade-grid[data-mounted="true"] .fade-card {
          transition: opacity 900ms ease-out, transform 900ms ease-out;
        }

        /* Only when revealed do we animate in */
        .fade-grid[data-mounted="true"][data-visible="true"] .fade-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .fade-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OverlappingNewsCards;
