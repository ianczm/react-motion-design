import { useGSAP } from "@gsap/react";
import { MousePosition, useMouse } from "@uidotdev/usehooks";
import gsap, { Power4 } from "gsap";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getRelativeCursorPos } from "./lib/linear-algebra/vectors";
import { cn } from "./lib/tailwind/utils";
import SmoothScroll from "./providers/smooth-scroll";
import { routes } from "./router/routes";

export default function App() {
  const projects = useRef<HTMLDivElement>(null);
  const [mouse, pageWrapper] = useMouse<HTMLDivElement>();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { duration: 2, ease: Power4.easeOut, stagger: 0.2 } });

      tl.from(
        ".gsap-bgimage-overlay",
        {
          width: "100%",
        },
        0,
      ).from(
        ".gsap-bgimage",
        {
          scale: 1.4,
        },
        0,
      );
    },
    { scope: projects },
  );

  const handleMouseMove = useCallback(
    (mouse: MousePosition) => {
      const factor = 2;
      if (pageWrapper.current) {
        const bgImages = pageWrapper.current.querySelectorAll(".gsap-bgimage");
        bgImages.forEach((image) => {
          const cursor = getRelativeCursorPos({ x: mouse.x, y: mouse.y }, image);
          gsap.to(".gsap-bgimage", {
            x: cursor.x * -factor,
            y: cursor.y * -factor,
            ease: Power4.easeOut,
            duration: 2,
          });
        });
      }
    },
    [pageWrapper],
  );

  useEffect(() => {
    handleMouseMove(mouse);
  }, [mouse, handleMouseMove]);

  return (
    <SmoothScroll>
      <main className={"bg-black transition-colors duration-500"}>
        <div ref={pageWrapper}>
          <div
            className={
              "flex h-[30%] flex-col justify-center p-8 md:p-16 lg:h-[40%] lg:justify-end lg:gap-2 lg:px-16 lg:py-32"
            }
          >
            <h1 className={"w-max text-xl font-bold uppercase tracking-widest text-[#fff] lg:text-3xl"}>
              React Motion Design
            </h1>
            <Link to={"https://github.com/ianczm"} className={"text-md w-max uppercase tracking-widest"}>
              github.com/ianczm
            </Link>
          </div>
          <div ref={projects} className={`grid h-[1440px] lg:grid-cols-2`}>
            {routes.map((option) => (
              <Link key={option.id} to={option.path ?? "/"} className={"relative block h-full overflow-hidden"}>
                <div className={"gsap-bgimage-overlay absolute bottom-0 left-0 top-0 z-10 w-0 bg-black"}></div>
                <div
                  className={
                    "gsap-bgimage absolute bottom-0 left-0 right-0 top-0 scale-110 bg-slate-950 bg-cover bg-center p-16"
                  }
                  style={{ backgroundImage: `url(${option.image})` }}
                ></div>
                <div className={"absolute bottom-0 left-0 right-0 top-0 flex items-end justify-start p-8 md:p-16"}>
                  <h2 className={cn("text-xl font-bold", option.dark ? "text-white" : "text-black")}>{option.text}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
