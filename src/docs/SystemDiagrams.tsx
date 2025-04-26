
import React from 'react';
import { Tab, Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/layout/Container";
import Section from '@/components/ui/layout/Section';
import Heading from '@/components/ui/typography/Heading';
import Text from '@/components/ui/typography/Text';
import Layout from '@/components/layout/Layout';
import ComponentHierarchy from './ComponentHierarchy';
import DataFlowDiagram from './DataFlowDiagram';
import RoutingMap from './RoutingMap';

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
              Visual documentation of the application's structure, data flow, and routing.
            </Text>
          </div>
          
          <Card className="p-6 bg-white shadow-md">
            <Tabs defaultValue="component-hierarchy" className="space-y-6">
              <div className="flex justify-center overflow-auto pb-2 border-b">
                <Tab value="component-hierarchy" className="px-4 py-2">
                  Component Hierarchy
                </Tab>
                <Tab value="data-flow" className="px-4 py-2">
                  Data Flow
                </Tab>
                <Tab value="routing-map" className="px-4 py-2">
                  Routing Map
                </Tab>
              </div>
              <div className="pt-2">
                <div data-value="component-hierarchy">
                  <ComponentHierarchy />
                </div>
                <div data-value="data-flow">
                  <DataFlowDiagram />
                </div>
                <div data-value="routing-map">
                  <RoutingMap />
                </div>
              </div>
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
            </ul>
          </div>
        </Container>
      </Section>
    </Layout>
  );
};

export default SystemDiagrams;
