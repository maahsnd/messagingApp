import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../src/components/Home/Home';
import LogIn from '../src/components/Log-in/LogIn';
import SignUp from '../src/components/Sign-up/SignUp';

function App() {
  const router = createBrowserRouter([
    { path: '/log-in', element: <LogIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/:username', element: <Home /> }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
