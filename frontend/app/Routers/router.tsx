import Page from "@/components/dashboard/page";
import LoginPage from "@/pages/login/page";
import { createBrowserRouter } from "react-router-dom";
import App from "../../src/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Page /> },
      { path: "login", element: <LoginPage /> }
    ],
  }
])