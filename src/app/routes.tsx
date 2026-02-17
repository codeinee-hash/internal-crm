import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/widgets/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/requests" replace />,
      },
      {
        path: "requests",
        lazy: () => import("@/pages/requests"),
      },
      {
        path: "history",
        lazy: () => import("@/pages/history"),
      },
    ],
  },
]);
