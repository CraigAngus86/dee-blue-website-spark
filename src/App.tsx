
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import './App.css';
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
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Layout component that includes Header and Footer
const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// Create a routes configuration with the Layout wrapper
const routes = [
  {
    element: <Layout />,
    children: [
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
    ]
  }
];

const router = createBrowserRouter(routes);
