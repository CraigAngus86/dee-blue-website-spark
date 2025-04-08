import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ComponentsDemo from "./pages/demo/ComponentsDemo";
import SponsorsDemo from "./pages/demo/SponsorsDemo";

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
];

const router = createBrowserRouter(routes);
