import React from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Landing from './pages/Landing';
import TeacherDash from './pages/TeacherDash';
import StudentDash from './pages/StudentDash';
import CreateTest from './pages/CreateTest';
import Test from './pages/Test';
import TestResult from './pages/TestResult';
import PrevTests from './pages/PrevTests';
import Layout from './Layout';

const RedirectToLogin: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return null;
};

const App: React.FC = () => {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Landing />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/teacher/:username',
          element: <TeacherDash />
        },
        {
          path: '/teacher/:username/create-test',
          element: <CreateTest />
        },
        {
          path: '/teacher/:username/test/:testId',
          element: <Test />
        },
        {
          path: '/teacher/:username/prev-tests',
          element: <PrevTests />
        },
        {
          path: '/student/:username',
          element: <StudentDash />
        },
        {
          path: '/student/:username/test/:testId',
          element: <Test />
        },
        {
          path: '/student/:username/test-result/:testId',
          element: <TestResult />
        },
        {
          path: '*',
          element: <RedirectToLogin /> 
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
