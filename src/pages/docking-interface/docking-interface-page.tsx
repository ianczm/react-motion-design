import { useMergedRef } from "@mantine/hooks";
import { useMeasure, useMouse } from "@uidotdev/usehooks";
import gsap from "gsap";
import { ComponentPropsWithoutRef, forwardRef, useEffect, useState } from "react";
import { easeOutQuart } from "../../lib/easings/easings";
import { Vector2D } from "../../lib/linear-algebra/vectors";
import { cn } from "../../lib/tailwind/utils";

type Styles = {
  outline: string;
  bg: string;
};

type StylesCollection = { [styleName: string]: Styles };

const baseStyles: StylesCollection = {
  primary: {
    outline: "outline-red-300",
    bg: "bg-red-300",
  },
  success: {
    outline: "outline-green-300",
    bg: "bg-green-300",
  },
  subtract: {
    outline: "bg-black",
    bg: "bg-black",
  },
};

const Ring = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div"> & { styles: Styles }>(
  (
    { children, className, styles }: Readonly<{ children?: React.ReactNode; className?: string; styles: Styles }>,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex aspect-square items-center justify-center rounded-full outline outline-[3px] -outline-offset-[3px] transition-[outline-color] duration-300 ease-in-out",
          styles.outline,
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

function Dot({
  children,
  className,
  styles,
}: Readonly<{ children?: React.ReactNode; className?: string; styles: Styles }>) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-full transition-colors duration-300 ease-in-out",
        styles.bg,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function DockingInterfacePage() {
  const [mouse, bigRingMouseRef] = useMouse<HTMLDivElement>();
  const [bigRingSizeRef, bigRingSize] = useMeasure();
  const bigRingRef = useMergedRef(bigRingMouseRef, bigRingSizeRef);

  const [bigRingCenter, setBigRingCenter] = useState<Vector2D>(Vector2D.of(0, 0));
  const [directionVector, setDirectionVector] = useState<Vector2D>(Vector2D.of(0, 0));

  const [isCentered, setIsCentered] = useState<boolean>(false);

  useEffect(() => {
    const x = mouse.elementPositionX + (bigRingSize.width ?? 0) / 2;
    const y = mouse.elementPositionY + (bigRingSize.height ?? 0) / 2;
    setBigRingCenter(Vector2D.of(x, y));
  }, [mouse.elementPositionX, mouse.elementPositionY, bigRingSize]);

  useEffect(() => {
    setDirectionVector(bigRingCenter.subtract(Vector2D.of(mouse.x, mouse.y)));
  }, [bigRingCenter, mouse.x, mouse.y]);

  useEffect(() => {
    setIsCentered(directionVector.inspect().magnitude < 3);
  }, [directionVector]);

  useEffect(() => {
    gsap.to(".gsap-cursor", {
      x: mouse.elementX - (bigRingSize.width ?? 0) / 2,
      y: mouse.elementY - (bigRingSize.height ?? 0) / 2,
      xPercent: -50,
      yPercent: -50,
      duration: 0.8,
      ease: easeOutQuart,
    });
  }, [mouse, bigRingSize]);

  function getStyles() {
    return isCentered ? baseStyles["success"] : baseStyles["primary"];
  }

  return (
    <div className={"relative flex h-screen w-screen items-center justify-center overflow-hidden"}>
      {/* Cursor */}
      <Dot className={"gsap-cursor absolute left-1/2 top-1/2 h-16 w-16"} styles={getStyles()} />
      {/* Main */}
      <Ring ref={bigRingRef} className={"relative w-[75vw] max-w-[600px]"} styles={getStyles()}>
        <Dot className={"absolute h-[calc(4rem+6px)] w-[calc(4rem+6px)] overflow-hidden"} styles={getStyles()}>
          <Dot className={"gsap-cursor absolute left-1/2 top-1/2 h-16 w-16"} styles={baseStyles["subtract"]} />
        </Dot>
      </Ring>
      {/* Debug */}
      <div className={"absolute left-8 top-8 flex flex-col gap-4"}>
        <div>
          <p>x: {directionVector.x}</p>
          <p>y: {directionVector.y}</p>
        </div>
        <div>
          <p>Angle: {(directionVector.inspect().angle * (180 / Math.PI)).toFixed(2)}</p>
          <p>Magnitude: {directionVector.inspect().magnitude.toFixed(2)}</p>
        </div>
        <div>
          <p>Centered: {isCentered ? "true" : "false"}</p>
        </div>
      </div>
    </div>
  );
}
