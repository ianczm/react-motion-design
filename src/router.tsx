import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error";
import Parallax from "./pages/parallax";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/parallax",
    element: <Parallax influence={40} offset={8} />,
  },
]);
