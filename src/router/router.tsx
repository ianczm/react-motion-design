import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import App from "../App";
import ErrorPage from "../pages/error";

export const router = createBrowserRouter([
  {
    id: "0",
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  ...routes,
]);
