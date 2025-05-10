
import React from 'react';
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";

/**
 * RoutingMap renders a visual representation of the application's routing structure
 * @component
 */
const RoutingMap: React.FC = () => {
  return (
    <Container className="py-8">
      <div className="mb-8 max-w-3xl mx-auto">
        <Heading level={1} className="mb-4">Routing Map</Heading>
        <Text>This diagram illustrates the routing structure of the Banks o' Dee FC application.</Text>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-5xl">
          <svg width="960" height="720" viewBox="0 0 960 720">
            {/* Router Container */}
            <g>
              <rect x="200" y="20" width="560" height="70" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="480" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">BrowserRouter</text>
              <line x1="480" y1="90" x2="480" y2="130" stroke="#64748b" strokeWidth="2" />
            </g>

            {/* Routes Container */}
            <g>
              <rect x="200" y="130" width="560" height="70" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="480" y="170" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">Routes</text>
              
              {/* Connect Routes to Route elements below */}
              <line x1="480" y1="200" x2="480" y2="240" stroke="#64748b" strokeWidth="2" />
            </g>

            {/* Route Elements */}
            <g>
              {/* Home Route */}
              <rect x="50" y="240" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="130" y="260" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="130" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/"</text>
              <line x1="130" y1="300" x2="130" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* News Route */}
              <rect x="230" y="240" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="310" y="260" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="310" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/news"</text>
              <line x1="310" y1="300" x2="310" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* Team Route */}
              <rect x="410" y="240" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="490" y="260" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="490" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/team"</text>
              <line x1="490" y1="300" x2="490" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* Matches Route */}
              <rect x="590" y="240" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="670" y="260" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="670" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/matches"</text>
              <line x1="670" y1="300" x2="670" y2="340" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* SpainPark Route */}
              <rect x="140" y="320" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="220" y="340" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="220" y="360" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/spainpark"</text>
              <line x1="220" y1="380" x2="220" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* Commercial Route */}
              <rect x="320" y="320" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="400" y="340" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="400" y="360" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="/commercial"</text>
              <line x1="400" y1="380" x2="400" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* Not Found Route */}
              <rect x="500" y="320" width="160" height="60" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="580" y="340" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Route</text>
              <text x="580" y="360" textAnchor="middle" dominantBaseline="middle" fontSize="12">path="*"</text>
              <line x1="580" y1="380" x2="580" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
            </g>

            {/* Page Components */}
            <g>
              <rect x="50" y="340" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="130" y="370" textAnchor="middle" dominantBaseline="middle" fontSize="14">HomePage</text>
              
              <rect x="230" y="340" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="310" y="370" textAnchor="middle" dominantBaseline="middle" fontSize="14">NewsPage</text>
              
              <rect x="410" y="340" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="490" y="370" textAnchor="middle" dominantBaseline="middle" fontSize="14">TeamAndManagement</text>
              
              <rect x="590" y="340" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="670" y="370" textAnchor="middle" dominantBaseline="middle" fontSize="14">MatchCentre</text>
              
              <rect x="140" y="420" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="220" y="450" textAnchor="middle" dominantBaseline="middle" fontSize="14">SpainParkPage</text>
              
              <rect x="320" y="420" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="400" y="450" textAnchor="middle" dominantBaseline="middle" fontSize="14">CommercialOpportunitiesPage</text>
              
              <rect x="500" y="420" width="160" height="60" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
              <text x="580" y="450" textAnchor="middle" dominantBaseline="middle" fontSize="14">NotFound</text>
            </g>

            {/* Layout Wrapper */}
            <g>
              <rect x="100" y="500" width="760" height="180" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" />
              <text x="140" y="530" textAnchor="start" dominantBaseline="middle" fontSize="16" fontWeight="bold">Layout Component</text>
              
              <rect x="140" y="550" width="160" height="50" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="220" y="575" textAnchor="middle" dominantBaseline="middle" fontSize="14">Header</text>
              
              <rect x="400" y="550" width="160" height="100" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="480" y="575" textAnchor="middle" dominantBaseline="middle" fontSize="14">Main Content</text>
              <text x="480" y="600" textAnchor="middle" dominantBaseline="middle" fontSize="10">(Route components)</text>
              <text x="480" y="620" textAnchor="middle" dominantBaseline="middle" fontSize="10">rendered here</text>
              
              <rect x="660" y="550" width="160" height="50" rx="5" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="740" y="575" textAnchor="middle" dominantBaseline="middle" fontSize="14">Footer</text>
              
              <circle cx="220" cy="640" r="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="220" y="640" textAnchor="middle" dominantBaseline="middle" fontSize="14">1</text>
              <circle cx="480" cy="640" r="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="480" y="640" textAnchor="middle" dominantBaseline="middle" fontSize="14">2</text>
              <circle cx="740" cy="640" r="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
              <text x="740" y="640" textAnchor="middle" dominantBaseline="middle" fontSize="14">3</text>
            </g>
            
            {/* Notes */}
            <g>
              <text x="120" y="690" textAnchor="start" dominantBaseline="middle" fontSize="12">1. Header with navigation links to all routes</text>
              <text x="120" y="710" textAnchor="start" dominantBaseline="middle" fontSize="12">2. Dynamic content rendered based on current route</text>
              <text x="500" y="690" textAnchor="start" dominantBaseline="middle" fontSize="12">3. Footer with additional navigation and information</text>
              <text x="500" y="710" textAnchor="start" dominantBaseline="middle" fontSize="12">• Home route redirects to /matches</text>
            </g>

            {/* Legend */}
            <g>
              <rect x="780" y="240" width="140" height="120" fill="white" stroke="#64748b" strokeWidth="1" rx="5" />
              <text x="850" y="260" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold">Routing Legend</text>
              
              <rect x="790" y="275" width="20" height="15" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" rx="3" />
              <text x="850" y="283" textAnchor="middle" dominantBaseline="middle" fontSize="10">Router Structure</text>
              
              <rect x="790" y="300" width="20" height="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="3" />
              <text x="850" y="308" textAnchor="middle" dominantBaseline="middle" fontSize="10">Route Definitions</text>
              
              <rect x="790" y="325" width="20" height="15" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" rx="3" />
              <text x="850" y="333" textAnchor="middle" dominantBaseline="middle" fontSize="10">Page Components</text>
              
              <rect x="790" y="350" width="20" height="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="3" />
              <text x="850" y="358" textAnchor="middle" dominantBaseline="middle" fontSize="10">Layout Elements</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default RoutingMap;
