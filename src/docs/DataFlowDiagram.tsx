
import React from 'react';
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";

/**
 * DataFlowDiagram renders a visual representation of the application's data flow
 * @component
 */
const DataFlowDiagram: React.FC = () => {
  return (
    <Container className="py-8">
      <div className="mb-8 max-w-3xl mx-auto">
        <Heading level={1} className="mb-4">Data Flow Diagram</Heading>
        <Text>This diagram illustrates how data flows through the Banks o' Dee FC application.</Text>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-5xl">
          <svg width="960" height="720" viewBox="0 0 960 720">
            {/* Main data sources */}
            <g>
              <rect x="50" y="50" width="860" height="70" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="85" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">Data Sources</text>
              
              {/* Data Source Types */}
              <rect x="100" y="100" width="120" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="5" />
              <text x="160" y="120" textAnchor="middle" dominantBaseline="middle" fontSize="13">Supabase</text>
              
              <rect x="250" y="100" width="120" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="5" />
              <text x="310" y="120" textAnchor="middle" dominantBaseline="middle" fontSize="13">Mock Data</text>

              <rect x="400" y="100" width="120" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="5" />
              <text x="460" y="120" textAnchor="middle" dominantBaseline="middle" fontSize="13">Static Assets</text>

              <rect x="550" y="100" width="120" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="5" />
              <text x="610" y="120" textAnchor="middle" dominantBaseline="middle" fontSize="13">Local Storage</text>

              <rect x="700" y="100" width="160" height="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="5" />
              <text x="780" y="120" textAnchor="middle" dominantBaseline="middle" fontSize="13">User Interaction</text>

              {/* Connect data sources to data flow layer */}
              <line x1="160" y1="140" x2="160" y2="170" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="310" y1="140" x2="310" y2="170" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="460" y1="140" x2="460" y2="170" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="610" y1="140" x2="610" y2="170" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="780" y1="140" x2="780" y2="170" stroke="#0284c7" strokeWidth="1.5" />
            </g>
            
            {/* Data Flow Layer */}
            <g>
              <rect x="50" y="170" width="860" height="150" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="190" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">Data Flow Management</text>
              
              {/* Tanstack Query */}
              <rect x="100" y="220" width="250" height="60" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="225" y="250" textAnchor="middle" dominantBaseline="middle" fontSize="14">Tanstack React Query</text>
              <text x="225" y="270" textAnchor="middle" dominantBaseline="middle" fontSize="10">Server State Management</text>

              {/* React State */}
              <rect x="400" y="220" width="240" height="60" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="520" y="250" textAnchor="middle" dominantBaseline="middle" fontSize="14">React State Hooks</text>
              <text x="520" y="270" textAnchor="middle" dominantBaseline="middle" fontSize="10">UI State Management</text>

              {/* Custom Hooks */}
              <rect x="680" y="220" width="200" height="60" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="780" y="250" textAnchor="middle" dominantBaseline="middle" fontSize="14">Custom Hooks</text>
              <text x="780" y="270" textAnchor="middle" dominantBaseline="middle" fontSize="10">Encapsulated Logic</text>
            </g>
            
            {/* Component States */}
            <g>
              <rect x="50" y="350" width="860" height="150" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="380" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">Component State</text>
              
              {/* Connect data flow to components */}
              <line x1="225" y1="280" x2="225" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="520" y1="280" x2="520" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="780" y1="280" x2="780" y2="420" stroke="#3b82f6" strokeWidth="1.5" />
              
              {/* Page States */}
              <rect x="100" y="420" width="200" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="200" y="445" textAnchor="middle" dominantBaseline="middle" fontSize="14">Page Level State</text>

              {/* Section States */}
              <rect x="350" y="420" width="200" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="450" y="445" textAnchor="middle" dominantBaseline="middle" fontSize="14">Section Level State</text>

              {/* UI Component States */}
              <rect x="600" y="420" width="200" height="50" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" rx="5" />
              <text x="700" y="445" textAnchor="middle" dominantBaseline="middle" fontSize="14">UI Component State</text>

              {/* Connect component states to presentation */}
              <line x1="200" y1="470" x2="200" y2="520" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="450" y1="470" x2="450" y2="520" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="700" y1="470" x2="700" y2="520" stroke="#3b82f6" strokeWidth="1.5" />
            </g>
            
            {/* Presentation Layer */}
            <g>
              <rect x="50" y="520" width="860" height="150" fill="#f8fafc" stroke="#64748b" strokeWidth="2" rx="5" />
              <text x="480" y="550" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">Presentation Layer</text>
              
              {/* Rendered UI */}
              <rect x="150" y="580" width="660" height="60" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" rx="5" />
              <text x="480" y="610" textAnchor="middle" dominantBaseline="middle" fontSize="14">Rendered UI Components</text>
              
              {/* User Events flow back */}
              <path d="M780,640 Q780,680 850,680 Q920,680 920,350 Q920,150 780,150" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              <polygon points="780,140 775,150 785,150" fill="#f59e0b" />
              <text x="870" y="450" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#f59e0b" transform="rotate(90, 870, 450)">User Events</text>
            </g>
            
            {/* Legend */}
            <g>
              <rect x="780" y="30" width="150" height="100" fill="white" stroke="#64748b" strokeWidth="1" rx="5" />
              <text x="855" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold">Data Flow Legend</text>
              
              <line x1="790" y1="70" x2="810" y2="70" stroke="#0284c7" strokeWidth="1.5" />
              <text x="855" y="70" dominantBaseline="middle" fontSize="10">Data Input</text>
              
              <line x1="790" y1="90" x2="810" y2="90" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="855" y="90" dominantBaseline="middle" fontSize="10">Component Updates</text>
              
              <line x1="790" y1="110" x2="810" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
              <text x="855" y="110" dominantBaseline="middle" fontSize="10">User Events</text>
            </g>

            {/* Data Flow Examples */}
            <g>
              <text x="100" y="320" fontSize="12" fontWeight="bold" fill="#0284c7">Example Flow:</text>
              <text x="100" y="340" fontSize="10">- Match data fetched via React Query</text>
              <text x="100" y="355" fontSize="10">- Stored in cache and component state</text>
              <text x="100" y="370" fontSize="10">- Rendered in MatchCard components</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default DataFlowDiagram;
