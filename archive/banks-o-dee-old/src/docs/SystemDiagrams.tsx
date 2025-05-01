
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/layout/Container";
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import Layout from '@/components/layout/Layout';
import ComponentHierarchy from './ComponentHierarchy';
import DataFlowDiagram from './DataFlowDiagram';
import RoutingMap from './RoutingMap';
import ContributionWorkflow from './ContributionWorkflow';

/**
 * SystemDiagrams shows all the application architecture diagrams in a tabbed interface
 * @component
 */
const SystemDiagrams: React.FC = () => {
  return (
    <Layout>
      <Section background="white" spacing="lg">
        <Container>
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <Heading level={1} className="mb-4">Banks o' Dee FC System Architecture</Heading>
            <Text size="large" className="text-gray-600">
              Visual documentation of the application's structure, data flow, routing, and development workflows.
            </Text>
          </div>
          
          <Card className="p-6 bg-white shadow-md">
            <Tabs defaultValue="component-hierarchy" className="space-y-6">
              <TabsList className="flex justify-center overflow-auto pb-2 border-b">
                <TabsTrigger value="component-hierarchy" className="px-4 py-2">
                  Component Hierarchy
                </TabsTrigger>
                <TabsTrigger value="data-flow" className="px-4 py-2">
                  Data Flow
                </TabsTrigger>
                <TabsTrigger value="routing-map" className="px-4 py-2">
                  Routing Map
                </TabsTrigger>
                <TabsTrigger value="contribution-workflow" className="px-4 py-2">
                  Contribution Workflow
                </TabsTrigger>
                <TabsTrigger value="data-model" className="px-4 py-2">
                  Data Model
                </TabsTrigger>
              </TabsList>
              <TabsContent value="component-hierarchy">
                <ComponentHierarchy />
              </TabsContent>
              <TabsContent value="data-flow">
                <DataFlowDiagram />
              </TabsContent>
              <TabsContent value="routing-map">
                <RoutingMap />
              </TabsContent>
              <TabsContent value="contribution-workflow">
                <ContributionWorkflow />
              </TabsContent>
              <TabsContent value="data-model">
                <div className="p-4">
                  <Heading level={2} className="mb-4">Database Schema - Match System</Heading>
                  <div className="overflow-auto border rounded-md p-4 bg-gray-50 mb-8">
                    <pre className="text-xs md:text-sm font-mono">
                      {`
# Banks o' Dee FC Database Schema

## Season & Competition Management
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     season      │       │season_competition│       │   competition   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ name            │╠══════╣ season_id       │╠══════╣ name            │
│ start_date      │       │ competition_id  │       │ logo            │
│ end_date        │       │                 │       │                 │
│ is_current      │       │                 │       │                 │
│ status          │       │                 │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘

## Match Management
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      match      │       │      team       │       │  league_table   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id              │       │ id              │       │ id              │
│ season_comp_id  │╠══════╣ name            │╠══════╣ season_comp_id  │
│ home_team_id    │       │ logo            │       │ team_id         │
│ away_team_id    │       │                 │       │ position        │
│ match_date      │       └─────────────────┘       │ played          │
│ match_time      │                                 │ won             │
│ venue           │                                 │ drawn           │
│ status          │                                 │ lost            │
│ is_completed    │                                 │ goals_for       │
│ home_score      │                                 │ goals_against   │
│ away_score      │                                 │ goal_difference │
│ ticket_link     │                                 │ points          │
│ match_report    │                                 │ form            │
└─────────────────┘                                 └─────────────────┘
`}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
            <Heading level={3} className="mb-4">Documentation Notes</Heading>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <Text>
                  <span className="font-semibold">Component Hierarchy:</span> Shows the hierarchical structure of components in the application, from top-level App component down to specific UI components.
                </Text>
              </li>
              <li>
                <Text>
                  <span className="font-semibold">Data Flow Diagram:</span> Illustrates how data moves through the application, from data sources through state management to the rendered UI.
                </Text>
              </li>
              <li>
                <Text>
                  <span className="font-semibold">Routing Map:</span> Displays the application's routing structure, showing the relationship between routes and the components they render.
                </Text>
              </li>
              <li>
                <Text>
                  <span className="font-semibold">Contribution Workflow:</span> Visualizes the development process from code submission through CI/CD pipeline to deployment.
                </Text>
              </li>
              <li>
                <Text>
                  <span className="font-semibold">Data Model:</span> Depicts the database schema showing relationships between key entities like seasons, competitions, matches, and teams.
                </Text>
              </li>
            </ul>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SystemDiagrams;
