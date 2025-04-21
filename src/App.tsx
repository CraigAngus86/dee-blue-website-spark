
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ComponentsDemo from "./pages/demo/ComponentsDemo";
import SponsorsDemo from "./pages/demo/SponsorsDemo";
import CompetitorsDemo from "./pages/demo/CompetitorsDemo";
import ImageDemo from "./pages/ImageDemo";
import ImagesDemo from "./pages/demo/ImagesDemo";
import ImageUtilsDemo from "./pages/demo/ImageUtilsDemo";
import AdvancedComponentsDemo from "./pages/demo/AdvancedComponentsDemo";
import ImageComponentsDemo from "./pages/demo/ImageComponentsDemo";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import TeamAndManagement from "./pages/TeamAndManagement";
import MatchCentre from "./pages/MatchCentre";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "/demo/components",
    element: <ComponentsDemo />,
  },
  {
    path: "/demo/sponsors",
    element: <SponsorsDemo />,
  },
  {
    path: "/demo/competitors",
    element: <CompetitorsDemo />,
  },
  {
    path: "/image-demo",
    element: <ImageDemo />,
  },
  {
    path: "/demo/images",
    element: <ImagesDemo />,
  },
  {
    path: "/demo/image-utils",
    element: <ImageUtilsDemo />,
  },
  {
    path: "/demo/advanced-components",
    element: <AdvancedComponentsDemo />,
  },
  {
    path: "/demo/image-components",
    element: <ImageComponentsDemo />,
  },
  {
    path: "/team",
    element: <TeamAndManagement />,
  },
  {
    path: "/matches",
    element: <MatchCentre />,
  },
  {
    path: "/match-centre",
    element: <Index />,
  }
];

const router = createBrowserRouter(routes);
