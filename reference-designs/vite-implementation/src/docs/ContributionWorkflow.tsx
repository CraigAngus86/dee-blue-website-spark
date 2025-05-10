
import React from 'react';
import Container from "@/components/ui/layout/Container";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";

/**
 * ContributionWorkflow renders a visual representation of the project's contribution workflow
 * @component
 */
const ContributionWorkflow: React.FC = () => {
  return (
    <Container className="py-8">
      <div className="mb-8 max-w-3xl mx-auto">
        <Heading level={1} className="mb-4">Contribution Workflow</Heading>
        <Text>This diagram illustrates the contribution process for the Banks o' Dee FC website project.</Text>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-5xl">
          <svg width="960" height="640" viewBox="0 0 960 640">
            {/* Developer Process */}
            <g>
              <rect x="50" y="40" width="200" height="160" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
              <text x="150" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold">Developer</text>
              
              <rect x="70" y="90" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="150" y="105" textAnchor="middle" dominantBaseline="middle" fontSize="12">1. Fork & Clone</text>
              
              <rect x="70" y="130" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="150" y="145" textAnchor="middle" dominantBaseline="middle" fontSize="12">2. Create Branch</text>
              
              <rect x="70" y="170" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="150" y="185" textAnchor="middle" dominantBaseline="middle" fontSize="12">3. Submit PR</text>
              
              <path d="M250 120 L350 120" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* GitHub CI Process */}
            <g>
              <rect x="350" y="40" width="200" height="240" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
              <text x="450" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold">GitHub</text>
              
              <rect x="370" y="90" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="450" y="105" textAnchor="middle" dominantBaseline="middle" fontSize="12">4. Type Check</text>
              
              <rect x="370" y="125" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="450" y="140" textAnchor="middle" dominantBaseline="middle" fontSize="12">5. Lint</text>
              
              <rect x="370" y="160" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="450" y="175" textAnchor="middle" dominantBaseline="middle" fontSize="12">6. Build</text>
              
              <rect x="370" y="195" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="450" y="210" textAnchor="middle" dominantBaseline="middle" fontSize="12">7. Test</text>
              
              <rect x="370" y="230" width="160" height="30" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="450" y="245" textAnchor="middle" dominantBaseline="middle" fontSize="12">8. PR Checks</text>
              
              <path d="M550 160 L650 160" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* Reviewers Process */}
            <g>
              <rect x="650" y="40" width="200" height="240" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
              <text x="750" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="16" fontWeight="bold">Reviewers</text>
              
              <rect x="670" y="90" width="160" height="50" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="750" y="105" textAnchor="middle" dominantBaseline="middle" fontSize="12">9. Code Review</text>
              <text x="750" y="125" textAnchor="middle" dominantBaseline="middle" fontSize="12">(Functionality, Style)</text>
              
              <rect x="670" y="150" width="160" height="50" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="750" y="165" textAnchor="middle" dominantBaseline="middle" fontSize="12">10. Request Changes</text>
              <text x="750" y="185" textAnchor="middle" dominantBaseline="middle" fontSize="12">or Approve</text>
              
              <rect x="670" y="210" width="160" height="50" rx="5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="750" y="235" textAnchor="middle" dominantBaseline="middle" fontSize="12">11. Documentation Review</text>
              
              <path d="M650 260 L550 260 L550 300" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* Feedback Loop */}
            <g>
              <rect x="350" y="300" width="200" height="70" rx="8" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
              <text x="450" y="335" textAnchor="middle" dominantBaseline="middle" fontSize="14">12. Address Feedback</text>
              
              <path d="M350 330 L250 330 L250 180" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M450 370 L450 400" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* Merge & Deploy */}
            <g>
              <rect x="350" y="400" width="200" height="70" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
              <text x="450" y="435" textAnchor="middle" dominantBaseline="middle" fontSize="14">13. Merge to Main Branch</text>
              
              <path d="M450 470 L450 500" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
            </g>

            {/* Deploy Step */}
            <g>
              <rect x="350" y="500" width="200" height="70" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
              <text x="450" y="525" textAnchor="middle" dominantBaseline="middle" fontSize="14">14. Automatic Deployment</text>
              <text x="450" y="545" textAnchor="middle" dominantBaseline="middle" fontSize="12">(Based on branch)</text>
            </g>

            {/* Arrows */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#0ea5e9" />
              </marker>
            </defs>
            
            {/* Legend */}
            <g>
              <rect x="700" y="400" width="220" height="130" fill="white" stroke="#64748b" strokeWidth="1" rx="5" />
              <text x="810" y="420" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="bold">Workflow Legend</text>
              
              <rect x="710" y="435" width="20" height="15" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="1.5" rx="3" />
              <text x="810" y="443" textAnchor="middle" dominantBaseline="middle" fontSize="12">Development Process</text>
              
              <rect x="710" y="460" width="20" height="15" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" rx="3" />
              <text x="810" y="468" textAnchor="middle" dominantBaseline="middle" fontSize="12">Deployment Process</text>
              
              <path d="M710 490 L730 490" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="810" y="493" textAnchor="middle" dominantBaseline="middle" fontSize="12">Process Flow</text>
              
              <rect x="710" y="505" width="20" height="15" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" rx="3" />
              <text x="810" y="513" textAnchor="middle" dominantBaseline="middle" fontSize="12">Individual Step</text>
            </g>
            
            {/* Notes */}
            <g>
              <text x="50" y="590" textAnchor="start" dominantBaseline="middle" fontSize="12" fontWeight="bold">Notes:</text>
              <text x="50" y="610" textAnchor="start" dominantBaseline="middle" fontSize="12">• All CI workflow steps must pass before code review begins</text>
              <text x="50" y="630" textAnchor="start" dominantBaseline="middle" fontSize="12">• Branch protection rules prevent merging PRs that fail CI or lack required reviews</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default ContributionWorkflow;
