import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { cn } from "../lib/tailwind/utils";
import { useLenis } from "@studio-freight/react-lenis";

const imageMap = {
  "00": -12,
  "01": -8,
  "02": -8,
  "03": -4,
  "04": 0,
  "05": 1,
  "06": 2,
  "07": 3,
  "08": 4,
  "09": 5,
  "10": 6,
  "11": 7,
  "12": 8,
  "13": 9,
  "14": 10,
  "15": 0,
};

function getImages(): { key: string; speed: number }[] {
  return Object.entries(imageMap)
    .map((o) => ({ key: o[0], speed: o[1] }))
    .sort((a, b) => parseInt(b.key) - parseInt(a.key));
}

export default function Parallax({ influence, offset }: Readonly<{ influence: number; offset: number }>) {
  const wrapper = useRef<HTMLDivElement>(null);
  const images = wrapper.current?.querySelectorAll("img");
  const titleText = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper.current,
        start: "top top",
        scrub: true,
      },
    });

    images?.forEach((image) => {
      const speed = parseInt(image.dataset.speed!);
      tl.to(
        image,
        {
          y: influence * (speed + offset),
          duration: 2,
        },
        0,
      );
    });

    tl.to(
      titleText.current,
      {
        y: influence * (4 + offset),
        duration: 2,
      },
      0,
    );

    const update = (t: number) => {
      lenis.raf(t * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  function getImage(key: string) {
    return new URL(`/src/assets/images/parallax-sky-${key}.png`, import.meta.url).href;
  }

  return (
    <main className="h-[200vh]">
      <div ref={wrapper} className={"relative h-[75vh] w-full lg:h-[calc(100vh+80px)]"}>
        {getImages().map(({ key, speed }) => (
          <img
            className={cn(
              "absolute -z-10 h-full w-full object-cover object-bottom",
              key === "00" ? "mix-blend-exclusion" : "",
              parseInt(key) > 7 ? "-z-20" : "",
            )}
            key={key}
            alt="Parallax images"
            src={getImage(key)}
            data-speed={speed}
          />
        ))}
        <div
          ref={titleText}
          className={"absolute top-0 -z-20 flex h-[50vh] w-full flex-col items-center justify-center text-center"}
        >
          <h1 className={"text-3xl font-bold uppercase tracking-widest text-[#1D2217]"}>The Children</h1>
          <h1 className={"text-2xl uppercase tracking-widest text-[#1D2217]"}>of Light</h1>
        </div>
      </div>
      <div className={"relative h-screen bg-[#060705]"}>
        <div
          className={
            "absolute top-[-20%] h-screen w-full bg-gradient-to-b from-[rgba(27,31,22,0)] via-[#1B1F16] via-20% to-[#060705] to-80%"
          }
        ></div>
      </div>
    </main>
  );
}
