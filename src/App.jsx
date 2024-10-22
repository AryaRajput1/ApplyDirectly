import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Onboarding from "./pages/Onboarding";
import JobsListing from "./pages/JobsListing";
import Job from "./pages/Job";
import MyJobs from "./pages/MyJobs";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import { ThemeProvider } from "./components/ui/theme-provider";
import ProtectedRoutes from './components/custom/ProtectedRoutes'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <ProtectedRoutes><Onboarding /> </ProtectedRoutes> ,
      },
      {
        path: "/job",
        element: <JobsListing />,
      },

      {
        path: "/job/:id",
        element: <Job />,
      },

      {
        path: "/saved-jobs",
        element: <SavedJobs />,
      },

      {
        path: "/my-jobs",
        element: <MyJobs />,
      },

      {
        path: "/post-job",
        element: <PostJob />,
      },
    ],
  },
]);

const App = () => {
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"><RouterProvider router={router} /></ThemeProvider>;
};

export default App;
