import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './pages/Login';
import Landing from './pages/Landing';
import TeacherDash from './pages/TeacherDash';
import StudentDash from './pages/StudentDash';
import CreateTest from './pages/CreateTest';
import AddQuestions from './pages/AddQuestions';
import TestCodeInput from './pages/TestCodeInput';
import Test from './pages/Test';
import TestResult from './pages/TestResult';
import AllTests from './pages/AllTests';
import Layout from './Layout';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const router = createBrowserRouter([
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
      element: <Layout />,
      children: [
        {
          path: '',
          element: <TeacherDash />
        },
        {
          path: 'create-test',
          element: <CreateTest />
        },
        {
          path: 'create-test/:testId/add-questions',
          element: <AddQuestions />
        },
        {
          path: 'tests',  //tests
          element: <AllTests />
        },
        {
          path: 'tests/:testId', //tests/testId
          element: <Test />
        },
      ]
    },
    {
      path: '/student/:username',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <StudentDash />
        },
        {
          path: 'test',
          element: <TestCodeInput />
        },
        {
          path: 'test/:testId',
          element: <Test />
        },
        {
          path: 'test-result/:testId',
          element: <TestResult />
        }
      ]
    },
    {
      path: '*',
      element: <Login />
    }
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
