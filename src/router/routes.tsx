import { RouteObject } from "react-router-dom";
import MagneticButtonPage from "../pages/magnetic-button-page";
import ParallaxPage from "../pages/parallax-page";
import SplineCubePage from "../pages/spline-cube-page/spline-cube-page";
import SplinePage from "../pages/spline-page";
import DockingInterfacePage from "../pages/docking-interface/docking-interface-page";

import cubeImg from "/src/assets/images/thumbnails/blocks-thumbnail.png";
import magnetImg from "/src/assets/images/thumbnails/magnet-thumbnail.png";
import parallaxImg from "/src/assets/images/thumbnails/parallax-sky-full.png";
import splineImg from "/src/assets/images/thumbnails/spline-thumbnail.png";
import dockingImg from "/src/assets/images/thumbnails/docking.png";

type ExtendedRouteObject = RouteObject & {
  text?: string;
  image?: string;
  dark?: boolean;
};

export const routes: ExtendedRouteObject[] = [
  {
    id: "1",
    path: "/spline-cube",
    text: "Spline Scroll",
    element: <SplineCubePage />,
    image: cubeImg,
    dark: true,
  },
  {
    id: "2",
    path: "/spline",
    text: "Spline Hover",
    element: <SplinePage />,
    image: splineImg,
    dark: true,
  },
  {
    id: "3",
    path: "/magnet",
    text: "Magnet",
    element: <MagneticButtonPage />,
    image: magnetImg,
    dark: true,
  },
  {
    id: "4",
    path: "/parallax",
    text: "Parallax",
    element: <ParallaxPage influence={40} offset={8} />,
    image: parallaxImg,
    dark: false,
  },
  {
    id: "5",
    path: "/docking",
    text: "Docking",
    element: <DockingInterfacePage />,
    image: dockingImg,
    dark: true,
  },
];
