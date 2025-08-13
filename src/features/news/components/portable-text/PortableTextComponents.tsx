import React from "react";
import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const { asset, alt, caption } = value;
      if (!asset || !asset.url) return null;

      return (
        <figure className="my-8 relative">
          <div className="overflow-hidden rounded-lg shadow-md border border-[rgb(var(--medium-gray))]">
            <img
              src={asset.url}
              alt={alt || "News image"}
              className="w-full h-auto"
            />
          </div>
          {caption && (
            <figcaption className="text-sm font-body text-[rgb(var(--dark-gray))] mt-2 italic text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const { href } = value;
      const isInternal = href.startsWith("/");
      const rel = isInternal ? undefined : "noreferrer noopener";
      const target = isInternal ? undefined : "_blank";

      return (
        <Link href={href} rel={rel} target={target} className="link">
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-body font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-body italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="px-1 py-0.5 rounded bg-[rgb(var(--light-gray))] font-mono text-sm">
        {children}
      </code>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-h1 font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-h2 font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-h3 font-heading tracking-[0.02em] text-[rgb(var(--brand-black))] mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-h4 font-body font-semibold text-[rgb(var(--brand-black))] mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-body text-base text-[rgb(var(--brand-black))] mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[rgb(var(--brand-gold))] pl-4 italic my-6 font-body text-[rgb(var(--dark-gray))]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-[rgb(var(--brand-black))]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="font-body text-[rgb(var(--brand-black))]">{children}</li>
    ),
  },
};

export default portableTextComponents;
