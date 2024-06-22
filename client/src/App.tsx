import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Landing from "./pages/Landing";
import TeacherDash from "./pages/TeacherDash";
import StudentDash from "./pages/StudentDash";
import CreateTest from "./pages/CreateTest";
import AddQuestions from "./pages/AddQuestions";
import TestCodeInput from "./pages/TestCodeInput";
import Test from "./pages/Test";
import TestResult from "./pages/TestResult";
import AllTests from "./pages/AllTests";
import AllTestsStudent from "./pages/AllTestsStudent";
import TestResultStudents from "./pages/TestResultStudents";
import Layout from "./Layout";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/teacher/:username",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <TeacherDash />,
        },
        {
          path: "create-test",
          element: <CreateTest />,
        },
        {
          path: "create-test/:testId/add-questions",
          element: <AddQuestions />,
        },
        {
          path: "tests", //tests
          element: <AllTests />,
        },
        {
          path: "tests/:testId", //tests/testId
          element: <Test />,
        },
        {
          path: "tests/:testId/results", //tests/testId/results
          element: <TestResult />,
        },
      ],
    },
    {
      path: "/student/:username",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <StudentDash />,
        },
        {
          path: "test",
          element: <TestCodeInput />,
        },
        {
          path: "test-result/:testId",
          element: <TestResultStudents />,
        },
      ],
    },
    {
      path: "/student/:username/test/:testId",
      element: <Test />,
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
      <div className="lg:hidden absolute top-0 left-0 w-screen h-screen  z-[1000] bg-white flex justify-center items-center">
        <p className="text-5xl ">Software only for bigger screens</p>{" "}
      </div>
    </>
  );
};

export default App;
