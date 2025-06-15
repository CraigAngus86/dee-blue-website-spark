import { ReactNode } from 'react';

interface AdminCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function AdminCard({ children, className = '', title }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-[#e5e7eb] p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-[#00105A] mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}
