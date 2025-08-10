"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Facebook, Linkedin, Mail, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { NewsArticle } from '../types';
import { PortableText } from '@portabletext/react';
import portableTextComponents from './portable-text/PortableTextComponents';
import { getCloudinaryImageUrl, getContentType } from '@/lib/cloudinary/imageTransforms';

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

// Map category values to display text (align with cards)
const categoryDisplay: Record<string, string> = {
  matchReport: 'Match Report',
  clubNews: 'Club News',
  teamNews: 'Team News',
  communityNews: 'Community News',
  commercialNews: 'Commercial News',
  matchGallery: 'Match Gallery'
};

const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount flag for portal (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Build a canonical article URL (avoid sharing modal/list state)
  const articleUrl = useMemo(() => {
    if (!article) return typeof window !== 'undefined' ? window.location.origin : '';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const rawSlug =
      typeof (article as any).slug === 'string'
        ? (article as any).slug
        : (article as any).slug?.current || '';
    // Adjust path if your route differs
    return rawSlug ? `${origin}/news/${encodeURIComponent(rawSlug)}` : origin;
  }, [article]);

  if (!mounted || !isOpen || !article) return null;

  const formattedDate = article.publishedAt
    ? format(new Date(article.publishedAt), "d MMMM yyyy")
    : '';

  // Cloudinary content type
  const contentType = getContentType(article.category);

  // Social sharing
  const shareOnX = () => {
    const text = `${article.title} | ${SITE_NAME}`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnLinkedin = () => {
    const title = article.title;
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareByEmail = () => {
    const subject = `${article.title} | ${SITE_NAME}`;
    const body = `I thought you might be interested in this article from ${SITE_NAME}: ${article.title}\n\n${articleUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      // Hook your toast/snackbar here if you have one
    } catch {
      // noop
    }
  };

  // Header height variable (adjust in :root to match your nav).
  const headerPx = '72px'; // fallback if --header-h not set

  const modal = (
    <div
      className="fixed inset-0 z-[200] bg-black/50"
      /* OPTIONAL: click outside to close */
      /* onClick={onClose} */
      aria-modal="true"
      role="dialog"
      aria-label="Article"
    >
      {/* Dialog container under the header, centered horizontally */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-full px-4 sm:px-6 md:px-8 z-[210]"
        style={{
          marginTop: `calc(var(--header-h, ${headerPx}) + 16px)`,
          marginBottom: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative mx-auto max-w-5xl max-h-[calc(100vh-32px-var(--header-h,72px))] bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ boxShadow: 'var(--shadow-xl)' }}
        >
          {/* Light header bar with share + close */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-[rgb(var(--neutral-silver))] z-40 flex justify-between items-center px-3 sm:px-4">
            {/* Social sharing buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={shareOnX}
                className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:bg-[rgba(252,199,67,0.18)] transition-colors"
                aria-label="Share on X"
              >
                <XLogo size={18} />
              </button>
              <button
                onClick={shareOnFacebook}
                className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:bg-[rgba(252,199,67,0.18)] transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook size={18} />
              </button>
              <button
                onClick={shareOnLinkedin}
                className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:bg-[rgba(252,199,67,0.18)] transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={18} />
              </button>
              <button
                onClick={shareByEmail}
                className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:bg-[rgba(252,199,67,0.18)] transition-colors"
                aria-label="Share by Email"
              >
                <Mail size={18} />
              </button>
              <button
                onClick={copyLink}
                className="w-8 h-8 flex items-center justify-center rounded-md text-black hover:bg-[rgba(252,199,67,0.18)] transition-colors"
                aria-label="Copy link"
              >
                <Copy size={18} />
              </button>
            </div>

            {/* Close */}
            <button
              className="text-black hover:text-[rgb(var(--brand-gold))] transition-colors"
              onClick={onClose}
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="overflow-y-auto max-h-[calc(100vh-32px-var(--header-h,72px))] pt-12">
            {/* Hero image */}
            <div className="relative w-full aspect-[16/9] bg-[rgb(var(--light-gray))]">
              {article.mainImage && !heroImgError ? (
                <img
                  src={getCloudinaryImageUrl(article.mainImage, {
                    variant: 'modal',
                    contentType,
                    width: 1200
                  })}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={() => setHeroImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-black/80 flex items-center justify-center">
                  <span className="text-white/70 text-sm">{SITE_NAME}</span>
                </div>
              )}

              {/* Readability gradient + gold warmth */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(252,199,67,0)_45%,rgba(252,199,67,0.12)_75%,rgba(252,199,67,0.20)_90%,rgba(252,199,67,0.24)_100%)]" />
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 text-xs font-bold bg-black text-[rgb(var(--brand-gold))] rounded">
                    {categoryDisplay[article.category] || article.category}
                  </span>
                  <span className="text-sm text-white/85">{formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="px-6 py-8 bg-white">
              {/* Excerpt callout */}
              {article.excerpt && (
                <div className="mb-8 text-lg font-medium text-[rgb(var(--dark-gray))] border-l-4 border-[rgb(var(--brand-gold))] pl-4 py-2 bg-[rgb(var(--light-gray))]">
                  {article.excerpt}
                </div>
              )}

              {/* Author */}
              {article.author && (
                <div className="mb-6 text-sm font-medium text-[rgb(var(--gray))]">
                  By {article.author}
                </div>
              )}

              {/* Body */}
              <div className="prose max-w-none">
                {Array.isArray(article.body) && article.body.length > 0 ? (
                  <PortableText value={article.body} components={portableTextComponents} />
                ) : typeof article.body === 'string' && article.body ? (
                  <p className="text-[rgb(var(--near-black))]">{article.body}</p>
                ) : (
                  <div>
                    <p className="text-[rgb(var(--near-black))]">
                      {SITE_NAME} article content will appear here once loaded.
                    </p>
                    <p className="mt-4 text-[rgb(var(--warning))]">
                      Note: Full article content is being loaded.
                    </p>
                  </div>
                )}
              </div>

              {/* Related players */}
              {article.relatedPlayers && article.relatedPlayers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[rgb(var(--light-gray))]">
                  <h3 className="text-xl font-bold mb-4">Featured Players</h3>
                  <div className="flex flex-wrap gap-4">
                    {article.relatedPlayers.map(player => (
                      <div key={player.id} className="flex items-center space-x-2 bg-[rgb(var(--light-gray))] p-2 rounded">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-black/80 text-white flex items-center justify-center">
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
                <div className="mt-8 pt-6 border-t border-[rgb(var(--light-gray))]">
                  <h3 className="text-xl font-bold mb-4">Photo Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {article.gallery.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow-md bg-[rgb(var(--light-gray))]">
                        <img
                          src={getCloudinaryImageUrl(image, {
                            variant: 'square',
                            contentType,
                            width: 400
                          })}
                          alt={image.alt || `Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
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
