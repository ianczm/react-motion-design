import { useState } from "react";
import MagneticButton from "./components/magnetic-button";
import { Vector2D } from "./lib/linear-algebra/vectors";

export default function App() {
  const [debug, setDebug] = useState(Vector2D.of(0, 0));

  return (
    <main className={"relative"}>
      <div className={"absolute flex flex-col p-4"}>
        <span className={"block"}>x: {debug.x.toFixed(2)}</span>
        <span className={"block"}>y: {debug.y.toFixed(2)}</span>
        <span className={"block"}>r: {debug.getMagnitude().toFixed(2)}</span>
      </div>
      <div className={"flex h-screen w-screen items-center justify-center"}>
        <MagneticButton onDebugChange={setDebug}>Cool Button</MagneticButton>
      </div>
    </main>
  );
}
