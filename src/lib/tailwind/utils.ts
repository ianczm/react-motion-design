import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageHref(imagePath: string) {
  return new URL(`/src/assets/images/${imagePath}`, import.meta.url).href;
}

export function getImageSrcPath(imagePath: string) {
  return getImageHref(imagePath).match(/(\/src\/assets\/.*)/g)?.[0];
}
