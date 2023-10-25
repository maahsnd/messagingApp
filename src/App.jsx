import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/components/Home/Home';

function App() {
  const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

  return <RouterProvider router={router} />;
}

export default App;
