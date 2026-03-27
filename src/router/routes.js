import { Navigate } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashBoard from "../pages/DashBoard";
import TablePage from "../pages/TablePage";
import FormPage from "../pages/FormPage";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "form", element: <FormPage /> },
      { path: "table", element: <TablePage /> }
    ]
  }
];
