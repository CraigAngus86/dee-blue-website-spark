import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DatabaseIcon, 
  CloudIcon, 
  BrushIcon, 
  WebhookIcon, 
  RefreshCwIcon, 
  ZapIcon 
} from 'lucide-react';

// Define test categories for the dashboard
const testCategories = [
  {
    title: 'Sanity CMS',
    description: 'Test connections, content fetching, and schema validation',
    href: '/admin/test-dashboard/sanity',
    icon: BrushIcon,
    color: 'border-amber-500',
    status: 'Complete',
    statusColor: 'bg-green-500'
  },
  {
    title: 'Cloudinary',
    description: 'Test image uploads, transformations, and optimization',
    href: '/admin/test-dashboard/cloudinary',
    icon: CloudIcon,
    color: 'border-blue-500',
    status: 'Complete',
    statusColor: 'bg-green-500'
  },
  {
    title: 'Supabase',
    description: 'Test database connections, queries, and real-time features',
    href: '/admin/test-dashboard/supabase',
    icon: DatabaseIcon,
    color: 'border-green-500',
    status: 'In Progress',
    statusColor: 'bg-amber-500'
  },
  {
    title: 'Webhooks',
    description: 'Test webhook endpoints and request handling',
    href: '/admin/test-dashboard/webhooks',
    icon: WebhookIcon,
    color: 'border-purple-500',
    status: 'In Progress',
    statusColor: 'bg-amber-500'
  },
  {
    title: 'Cross-System',
    description: 'Test integration between different systems',
    href: '/admin/test-dashboard/cross-system',
    icon: RefreshCwIcon,
    color: 'border-orange-500',
    status: 'In Progress',
    statusColor: 'bg-amber-500'
  },
  {
    title: 'Performance',
    description: 'Test page load times and API response times',
    href: '/admin/test-dashboard/performance',
    icon: ZapIcon,
    color: 'border-red-500',
    status: 'In Progress',
    statusColor: 'bg-amber-500'
  }
];

export default function TestDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Developer Test Dashboard</h1>
        <p className="text-gray-500">Tools for testing and debugging Banks o' Dee FC website components</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testCategories.map((category) => {
          const Icon = category.icon;
          
          return (
            <Link href={category.href} key={category.href} className="block h-full">
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-t-4" style={{ borderTopColor: category.color.replace('border-', '') }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className={`${category.color.replace('border', 'bg')} p-2 rounded-md text-white mr-3`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {category.title}
                    <div className={`ml-auto text-xs py-1 px-2 rounded-full text-white ${category.statusColor}`}>
                      {category.status}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {category.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-8">
        <h3 className="text-blue-800 font-medium mb-2">Documentation & Usage</h3>
        <p className="text-blue-700 text-sm">
          This test dashboard provides tools to verify system components, test integrations, and monitor performance.
          Use these tools during development and debugging to ensure all systems work correctly.
        </p>
        <p className="text-blue-700 text-sm mt-2">
          Each page contains detailed documentation about the specific subsystem, test tools, and troubleshooting guidance.
        </p>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <h3 className="font-semibold mb-2">Recent Updates</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Added Sanity Content Explorer for browsing document types</li>
          <li>Added Cloudinary transformation demonstrations and code patterns</li>
          <li>Consolidated test pages into a unified dashboard</li>
          <li>Added comprehensive documentation throughout test pages</li>
          <li>Fixed horizontal scrolling issues in data tables</li>
        </ul>
      </div>
    </div>
  );
}
