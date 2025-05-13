import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function TestDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="flex py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-1">
          <li>
            <Link href="/" className="hover:text-gray-700">
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link href="/admin" className="ml-1 hover:text-gray-700">
              Admin
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link href="/admin/test-dashboard" className="ml-1 hover:text-gray-700">
              Test Dashboard
            </Link>
          </li>
        </ol>
      </nav>
      
      {children}
      
      <footer className="mt-12 mb-6 text-center text-sm text-gray-500">
        <p>Banks o' Dee FC Developer Tools</p>
        <p className="mt-1">Last updated: May 13, 2025</p>
      </footer>
    </div>
  );
}
