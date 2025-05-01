
import React from 'react';
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";

/**
 * ComponentHierarchy renders a visual representation of the component structure
 * @component
 */
const ComponentHierarchy: React.FC = () => {
  return (
    <Container className="py-8">
      <div className="mb-8 max-w-3xl mx-auto">
        <Heading level={1} className="mb-4">Component Hierarchy</Heading>
        <Text>This diagram shows the hierarchical relationship between components in the application.</Text>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-5xl">
          <svg width="960" height="720" viewBox="0 0 960 720">
            {/* Main App Container */}
            <g>
              <rect x="400" y="20" width="160" height="50" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">App</text>
              <line x1="480" y1="70" x2="480" y2="100" stroke="#64748b" strokeWidth="2" />
            </g>
            
            {/* Router */}
            <g>
              <rect x="400" y="100" width="160" height="50" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="125" textAnchor="middle" dominantBaseline="middle" fontSize="14">BrowserRouter</text>
              <line x1="480" y1="150" x2="480" y2="180" stroke="#64748b" strokeWidth="2" />
            </g>
            
            {/* Layout */}
            <g>
              <rect x="400" y="180" width="160" height="50" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="205" textAnchor="middle" dominantBaseline="middle" fontSize="14">Layout</text>
              <line x1="480" y1="230" x2="480" y2="260" stroke="#64748b" strokeWidth="2" />
              
              {/* Header and Footer */}
              <rect x="300" y="260" width="160" height="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="380" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">Header</text>
              
              <rect x="500" y="260" width="160" height="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="580" y="280" textAnchor="middle" dominantBaseline="middle" fontSize="12">Footer</text>
              
              {/* Connect Layout to main content */}
              <line x1="480" y1="300" x2="480" y2="330" stroke="#64748b" strokeWidth="2" />
            </g>
            
            {/* Pages */}
            <g>
              <rect x="80" y="330" width="800" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="480" y="355" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Pages</text>
              
              {/* Page Types */}
              <rect x="80" y="410" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="140" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">HomePage</text>
              
              <rect x="210" y="410" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="270" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">NewsPage</text>
              
              <rect x="340" y="410" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="400" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">TeamAndManagement</text>
              
              <rect x="470" y="410" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="530" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">MatchCentre</text>
              
              <rect x="600" y="410" width="120" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="660" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">SpainParkPage</text>
              
              <rect x="730" y="410" width="150" height="40" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" rx="5" />
              <text x="805" y="430" textAnchor="middle" dominantBaseline="middle" fontSize="12">CommercialOpportunitiesPage</text>
              
              {/* Connect to Sections */}
              <line x1="140" y1="450" x2="140" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="270" y1="450" x2="270" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="400" y1="450" x2="400" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="530" y1="450" x2="530" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="660" y1="450" x2="660" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="805" y1="450" x2="805" y2="480" stroke="#3b82f6" strokeWidth="1.5" />
            </g>
            
            {/* Section Components */}
            <g>
              <rect x="80" y="480" width="800" height="50" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="480" y="505" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Section Components</text>
              
              {/* Section Types */}
              <rect x="80" y="560" width="120" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="140" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">HeroSection</text>
              
              <rect x="210" y="560" width="120" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="270" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">NewsSection</text>
              
              <rect x="340" y="560" width="120" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="400" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">PlayersSection</text>
              
              <rect x="470" y="560" width="120" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="530" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">MatchCenter</text>
              
              <rect x="600" y="560" width="120" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="660" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">StadiumSection</text>
              
              <rect x="730" y="560" width="150" height="40" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="5" />
              <text x="805" y="580" textAnchor="middle" dominantBaseline="middle" fontSize="12">SponsorsSection</text>
              
              {/* Connect to UI Components */}
              <line x1="480" y1="600" x2="480" y2="630" stroke="#10b981" strokeWidth="1.5" />
            </g>
            
            {/* UI Components */}
            <g>
              <rect x="80" y="630" width="800" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="5" />
              <text x="480" y="655" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">UI Components</text>
              
              {/* Component examples */}
              <rect x="80" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="130" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">Button</text>
              
              <rect x="190" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="240" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">Card</text>
              
              <rect x="300" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="350" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">MatchCard</text>
              
              <rect x="410" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="460" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">PlayerCard</text>
              
              <rect x="520" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="570" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">NewsCard</text>
              
              <rect x="630" y="700" width="100" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="680" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">SponsorLogo</text>
              
              <rect x="740" y="700" width="140" height="30" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="5" />
              <text x="810" y="715" textAnchor="middle" dominantBaseline="middle" fontSize="10">LeagueTableWidget</text>
            </g>
            
            {/* Legend */}
            <g transform="translate(20, 20)">
              <rect x="0" y="0" width="180" height="100" fill="white" stroke="#64748b" strokeWidth="1" rx="5" />
              <text x="90" y="20" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold">Legend</text>
              
              <rect x="10" y="30" width="30" height="15" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" rx="2" />
              <text x="50" y="38" dominantBaseline="middle" fontSize="10">Core Structure</text>
              
              <rect x="10" y="50" width="30" height="15" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" rx="2" />
              <text x="50" y="58" dominantBaseline="middle" fontSize="10">Pages</text>
              
              <rect x="10" y="70" width="30" height="15" fill="#d1fae5" stroke="#10b981" strokeWidth="1" rx="2" />
              <text x="50" y="78" dominantBaseline="middle" fontSize="10">Section Components</text>
              
              <rect x="10" y="90" width="30" height="15" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" rx="2" />
              <text x="50" y="98" dominantBaseline="middle" fontSize="10">UI Components</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default ComponentHierarchy;
