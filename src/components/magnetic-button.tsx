import React, { MouseEvent, MouseEventHandler, useRef } from "react";
import gsap, { Elastic, Power4 } from "gsap";
import { Vector2D, getNormalizedDistanceFromCenter2D } from "../lib/linear-algebra/vectors";
import { cn } from "../lib/tailwind/utils";

type MotionOpts = {
  elasticDuration: number;
  trackDuration: number;
  influence: number;
};

const defaults: {
  buttonOpts: MotionOpts;
  textOpts: MotionOpts;
} = {
  buttonOpts: {
    elasticDuration: 1,
    trackDuration: 1,
    influence: 60,
  },
  textOpts: {
    elasticDuration: 1,
    trackDuration: 1,
    influence: 30,
  },
};

interface MagneticButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: React.ReactNode;
  onDebugChange?: (vector: Vector2D) => void;
  buttonOpts?: MotionOpts;
  textOpts?: MotionOpts;
  onMouseMove?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  classNames?: {
    button?: string;
    text?: string;
  };
}

export default function MagneticButton({
  children,
  onDebugChange,
  buttonOpts,
  textOpts,
  classNames,
  onMouseMove,
  onMouseLeave,
  ...buttonProps
}: Readonly<MagneticButtonProps>) {
  function handleDebugUpdate(normalized: Vector2D) {
    if (onDebugChange) {
      onDebugChange(normalized);
    }
  }

  function gsapMagnetize(target: Element, normalized: Vector2D, opts: MotionOpts): void {
    gsap.to(target, {
      duration: opts.trackDuration,
      x: normalized.x * opts.influence,
      y: normalized.y * opts.influence,
      ease: Power4.easeOut,
    });
  }

  function gsapDemagnetize(target: Element, opts: MotionOpts): void {
    gsap.to(target, {
      duration: opts.elasticDuration,
      x: 0,
      y: 0,
      ease: Elastic.easeOut,
    });
  }

  function magnetize(event: MouseEvent): void {
    const cursor = { x: event.clientX, y: event.clientY };
    const buttonBounds = button.current?.getBoundingClientRect();
    const normalized = getNormalizedDistanceFromCenter2D(cursor, {
      x: buttonBounds!.left,
      y: buttonBounds!.top,
      width: buttonBounds!.width,
      height: buttonBounds!.height,
    });
    handleDebugUpdate(normalized);
    gsapMagnetize(button.current!, normalized, { ...defaults.buttonOpts, ...buttonOpts });
    gsapMagnetize(text.current!, normalized, { ...defaults.textOpts, ...textOpts });
  }

  function demagnetize(): void {
    gsapDemagnetize(button.current!, { ...defaults.buttonOpts, ...buttonOpts });
    gsapDemagnetize(text.current!, { ...defaults.textOpts, ...textOpts });
  }

  function handleMouseMove(event: MouseEvent) {
    magnetize(event);
    if (onMouseMove) {
      onMouseMove(event);
    }
  }

  function handleMouseLeave(event: MouseEvent) {
    demagnetize();
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }

  const button = useRef<HTMLButtonElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  return (
    <button
      ref={button}
      className={cn("flex h-48 w-48 items-center justify-center rounded-full bg-white", classNames?.button)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...buttonProps}
    >
      <span ref={text} className={cn("block font-bold text-black", classNames?.text)}>
        {children}
      </span>
    </button>
  );
}
