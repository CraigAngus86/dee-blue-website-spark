import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // Handle image blocks
      const { asset, alt, caption } = value;
      if (!asset || !asset.url) {
        return null;
      }
      
      return (
        <figure className="my-8 relative">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={asset.url} 
              alt={alt || 'News image'} 
              className="w-full h-auto"
            />
          </div>
          {caption && (
            <figcaption className="text-sm text-gray-600 mt-2 italic text-center">
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
      const isInternal = href.startsWith('/');
      
      const rel = isInternal ? undefined : 'noreferrer noopener';
      const target = isInternal ? undefined : '_blank';
      
      return (
        <Link href={href} rel={rel} target={target} className="text-[#00105A] underline hover:text-[#C5E7FF]">
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1 py-0.5 rounded bg-gray-100 font-mono text-sm">{children}</code>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4 text-[#00105A] font-montserrat">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-3 text-[#00105A] font-montserrat">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold my-2 text-[#00105A] font-montserrat">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold my-2 text-[#00105A] font-montserrat">{children}</h4>,
    normal: ({ children }) => <p className="my-4 text-gray-800">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#00105A] pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-gray-800">{children}</li>,
    number: ({ children }) => <li className="text-gray-800">{children}</li>,
  },
};

export default portableTextComponents;
