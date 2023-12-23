import { useGSAP } from "@gsap/react";
import gsap, { Power4 } from "gsap";
import { MouseEventHandler, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "./lib/tailwind/utils";
import magnetImg from "/src/assets/images/magnet-thumbnail.png";
import parallaxImg from "/src/assets/images/parallax-sky-full.png";
import { getRelativeCursorPos } from "./lib/linear-algebra/vectors";

const options = [
  {
    id: 1,
    text: "Parallax",
    path: "/parallax",
    image: parallaxImg,
    dark: false,
  },
  {
    id: 2,
    text: "Magnet",
    path: "/magnet",
    image: magnetImg,
    dark: true,
  },
];

export default function App() {
  const projects = useRef<HTMLDivElement>(null);
  const pageWrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { duration: 2, ease: Power4.easeOut, stagger: 0.2 } });

      tl.from(
        ".bgimage-overlay",
        {
          width: "100%",
        },
        0,
      ).from(
        ".bgimage",
        {
          scale: 1.4,
        },
        0,
      );
    },
    { scope: projects },
  );

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (pageWrapper.current) {
      const bgImages = pageWrapper.current.querySelectorAll(".bgimage");
      bgImages.forEach((image) => {
        const cursor = getRelativeCursorPos({ x: event.clientX, y: event.clientY }, image);
        gsap.to(".bgimage", {
          x: cursor.x * -5,
          y: cursor.y * -5,
          ease: Power4.easeOut,
          duration: 2,
        });
      });
    }
  };

  return (
    <main className={"h-screen bg-black transition-colors duration-500"}>
      <div ref={pageWrapper} className={"h-[100%]"} onMouseMove={handleMouseMove}>
        <div className={"flex h-[30%] flex-col justify-center p-8 md:p-16 lg:h-[40%] lg:justify-end lg:gap-2 lg:p-32"}>
          <h1 className={"w-max text-xl font-bold uppercase tracking-widest text-[#fff] lg:text-3xl"}>
            React Motion Design
          </h1>
          <Link to={"https://github.com/ianczm"} className={"text-md w-max uppercase tracking-widest"}>
            github.com/ianczm
          </Link>
        </div>
        <div ref={projects} className={"grid h-[70%] grid-rows-2 lg:h-[60%] lg:grid-cols-2 lg:grid-rows-none"}>
          {options.map((option) => (
            <Link key={option.id} to={option.path} className={"relative block h-full overflow-hidden"}>
              <div className={"bgimage-overlay absolute bottom-0 left-0 top-0 z-10 w-0 bg-black"}></div>
              <div
                className={"bgimage absolute bottom-0 left-0 right-0 top-0 scale-110 bg-cover bg-center p-16"}
                style={{ backgroundImage: `url(${option.image})` }}
              ></div>
              <div
                className={"absolute bottom-0 left-0 right-0 top-0 flex items-end justify-start p-8 md:p-16 lg:p-32"}
              >
                <h2 className={cn("text-xl font-bold", option.dark ? "text-white" : "text-black")}>{option.text}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
