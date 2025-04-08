import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ComponentsDemo from "./pages/demo/ComponentsDemo";
import SponsorsDemo from "./pages/demo/SponsorsDemo";
import CompetitorsDemo from "./pages/demo/CompetitorsDemo";
import ImageDemo from "./pages/ImageDemo";
import ImagesDemo from "./pages/demo/ImagesDemo";

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;

const routes = [
  {
    path: "/",
    element: <ComponentsDemo />,
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
];

const router = createBrowserRouter(routes);
