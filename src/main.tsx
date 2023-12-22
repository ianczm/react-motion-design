import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";
import { ReactLenis } from "@studio-freight/react-lenis";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactLenis root options={{ smoothTouch: true }}>
      <RouterProvider router={router} />
    </ReactLenis>
  </React.StrictMode>,
);
