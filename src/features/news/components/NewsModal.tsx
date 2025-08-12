"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Facebook, Linkedin, Mail, Copy } from "lucide-react";
import { format } from "date-fns";
import { NewsArticle } from "../types";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "./portable-text/PortableTextComponents";
import { getCloudinaryImageUrl, getContentType } from "@/lib/cloudinary/imageTransforms";

interface NewsModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

// X (Twitter) Logo Component
const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SITE_NAME = "Baynounah SC";
const headerPx = "72px"; // fallback if --header-h not set

const categoryDisplay: Record<string, string> = {
  matchReport: "Match Report",
  clubNews: "Club News",
  teamNews: "Team News",
  communityNews: "Community News",
  commercialNews: "Commercial News",
  matchGallery: "Match Gallery",
};

const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // lock scroll under modal
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ESC to close
  const onEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onEsc]);

  // canonical URL
  const articleUrl = useMemo(() => {
    if (!article) return typeof window !== "undefined" ? window.location.origin : "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const rawSlug =
      typeof (article as any).slug === "string"
        ? (article as any).slug
        : (article as any).slug?.current || "";
    return rawSlug ? `${origin}/news/${encodeURIComponent(rawSlug)}` : origin;
  }, [article]);

  if (!mounted || !isOpen || !article) return null;

  const formattedDate = article.publishedAt ? format(new Date(article.publishedAt), "d MMMM yyyy") : "";
  const contentType = getContentType(article.category);

  // share handlers
  const shareOnX = () => {
    const text = `${article.title} | ${SITE_NAME}`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const shareOnLinkedin = () => {
    const title = article.title;
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(title)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const shareByEmail = () => {
    const subject = `${article.title} | ${SITE_NAME}`;
    const body = `I thought you might be interested in this article from ${SITE_NAME}: ${article.title}\n\n${articleUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
    } catch {
      /* noop */
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[200] bg-[rgb(var(--brand-black)/0.50)]"
      aria-modal="true"
      role="dialog"
      aria-label="Article"
      // onClick={onClose} // enable if you want click-away
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 md:px-8 z-[210]"
        style={{
          marginTop: `calc(var(--header-h, ${headerPx}) + 16px)`,
          marginBottom: "16px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative mx-auto max-w-5xl max-h-[calc(100vh-32px-var(--header-h,72px))] bg-[rgb(var(--white))] rounded-lg overflow-hidden"
          style={{ boxShadow: "var(--shadow-xl)" }}
        >
          {/* Title bar — warm grey to match spec */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-[rgb(var(--warm-gray))] border-b border-[rgb(var(--neutral-silver))] z-40 flex justify-between items-center px-3 sm:px-4">
            <div className="flex items-center gap-1.5">
              {[
                { onClick: shareOnX, label: "Share on X", Icon: XLogo },
                { onClick: shareOnFacebook, label: "Share on Facebook", Icon: Facebook },
                { onClick: shareOnLinkedin, label: "Share on LinkedIn", Icon: Linkedin },
                { onClick: shareByEmail, label: "Share by Email", Icon: Mail },
                { onClick: copyLink, label: "Copy link", Icon: Copy },
              ].map(({ onClick, label, Icon }, idx) => (
                <button
                  key={idx}
                  onClick={onClick}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-[rgb(var(--brand-black))] hover:bg-[rgb(var(--brand-gold)/0.18)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--warm-gray))]"
                  aria-label={label}
                >
                  {/* @ts-ignore */}
                  <Icon size={18} />
                </button>
              ))}
            </div>

            <button
              className="text-[rgb(var(--brand-black))] hover:text-[rgb(var(--brand-gold))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--brand-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--warm-gray))]"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="overflow-y-auto max-h-[calc(100vh-32px-var(--header-h,72px))] pt-12">
            {/* Hero image with overlay identical to homepage hero */}
            <div className="relative w-full aspect-[16/9] bg-[rgb(var(--warm-gray))]">
              {article.mainImage && !heroImgError ? (
                <img
                  src={getCloudinaryImageUrl(article.mainImage, {
                    variant: "modal",
                    contentType,
                    width: 1200,
                  })}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={() => setHeroImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-[rgb(var(--brand-black)/0.80)] flex items-center justify-center">
                  <span className="text-[rgb(var(--white)/0.70)] text-sm">{SITE_NAME}</span>
                </div>
              )}

              {/* Overlay — same as HomeHeroSection (desktop recipe) */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        to top,
                        rgba(0,0,0,0.82) 15%,
                        rgba(0,0,0,0.42) 50%,
                        rgba(0,0,0,0.18) 60%,
                        rgba(0,0,0,0.00) 90%
                      ),
                      radial-gradient(
                        80% 60% at 70% 85%,
                        rgb(var(--brand-gold)/0.08) 0%,
                        rgb(var(--brand-gold)/0.00) 70%
                      )
                    `,
                    backgroundBlendMode: "multiply, overlay",
                  }}
                />
              </div>

              {/* Title overlay (inherits Bebas 400 + 0.02em from globals) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[rgb(var(--white))] z-20">
                <h1 className="text-xl md:text-4xl lg:text-5xl mb-3 leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider bg-[rgb(var(--brand-black))] text-[rgb(var(--brand-gold))] rounded">
                    {categoryDisplay[article.category] || article.category}
                  </span>
                  <span className="text-sm text-[rgb(var(--white)/0.85)]">{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="px-6 py-8 bg-[rgb(var(--white))] text-[rgb(var(--brand-black))]">
              {/* Excerpt callout */}
              {article.excerpt && (
                <div className="mb-8 text-lg font-medium text-[rgb(var(--brand-black)/0.72)] border-l-4 border-[rgb(var(--brand-gold))] pl-4 py-2 bg-[rgb(var(--warm-gray))]">
                  {article.excerpt}
                </div>
              )}

              {/* Author */}
              {article.author && (
                <div className="mb-6 text-sm font-medium text-[rgb(var(--brand-black)/0.60)]">
                  By {article.author}
                </div>
              )}

              {/* Body */}
              <div className="prose max-w-none">
                {Array.isArray(article.body) && article.body.length > 0 ? (
                  <PortableText value={article.body} components={portableTextComponents} />
                ) : typeof article.body === "string" && article.body ? (
                  <p>{article.body}</p>
                ) : (
                  <div>
                    <p>{SITE_NAME} article content will appear here once loaded.</p>
                  </div>
                )}
              </div>

              {/* Related players */}
              {article.relatedPlayers && article.relatedPlayers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[rgb(var(--neutral-silver))]">
                  <h3 className="text-xl mb-4">Featured Players</h3>
                  <div className="flex flex-wrap gap-4">
                    {article.relatedPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center space-x-2 bg-[rgb(var(--warm-gray))] p-2 rounded"
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[rgb(var(--brand-black)/0.80)] text-[rgb(var(--white))] flex items-center justify-center">
                          <span className="text-xs">{player.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {article.gallery && article.gallery.images && article.gallery.images.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[rgb(var(--neutral-silver))]">
                  <h3 className="text-xl mb-4">Photo Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {article.gallery.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden shadow-md bg-[rgb(var(--warm-gray))]"
                      >
                        <img
                          src={getCloudinaryImageUrl(image, {
                            variant: "square",
                            contentType,
                            width: 400,
                          })}
                          alt={image.alt || `Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-[rgb(var(--brand-black)/0.70)] text-[rgb(var(--white))] p-2 text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default NewsModal;
