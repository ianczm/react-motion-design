import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../components/magnetic-button";
import { Vector2D } from "../lib/linear-algebra/vectors";
import { cn } from "../lib/tailwind/utils";

export default function MagneticButtonPage() {
  const [debug, setDebug] = useState(Vector2D.of(0, 0));
  const [isBgActive, setIsBgActive] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate("/parallax");
  }

  return (
    <main className={cn("relative transition-colors duration-500", isBgActive ? "bg-[#0b1104]" : "bg-black")}>
      <div className={"absolute flex flex-col p-4"}>
        <span className={"block"}>x: {debug.x.toFixed(2)}</span>
        <span className={"block"}>y: {debug.y.toFixed(2)}</span>
        <span className={"block"}>r: {debug.getMagnitude().toFixed(2)}</span>
      </div>
      <div className={"flex h-screen w-screen items-center justify-center"}>
        <MagneticButton
          onDebugChange={setDebug}
          onMouseMove={() => setIsBgActive(true)}
          onMouseLeave={() => setIsBgActive(false)}
          onClick={handleClick}
          classNames={{
            button:
              "bg-lime-500 shadow-lime-800 shadow-[0_0_64px_0px] hover:shadow-[0_0_128px_30px] hover:shadow-lime-800 transition-shadow h-60 w-60",
            text: "text-white",
          }}
        >
          Activate Parallax
        </MagneticButton>
      </div>
    </main>
  );
}
