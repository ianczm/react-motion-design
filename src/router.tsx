import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error";
import ParallaxPage from "./pages/parallax-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/parallax",
    element: <ParallaxPage influence={40} offset={8} />,
  },
]);
