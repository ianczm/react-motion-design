import { ReactLenis, ReactLenisOptions } from "@studio-freight/react-lenis";

type SmoothScrollProps = {
  root?: boolean;
  options?: ReactLenisOptions;
  autoRaf?: boolean;
  rafPriority?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function SmoothScroll({ children }: Readonly<SmoothScrollProps>) {
  return <ReactLenis root>{children}</ReactLenis>;
}
