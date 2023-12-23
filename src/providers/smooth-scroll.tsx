import { ReactLenis, ReactLenisOptions } from "@studio-freight/react-lenis";

type SmoothScrollProps = {
  root?: boolean;
  options?: ReactLenisOptions & { wheelMultiplier: number; touchMultiplier: number };
  autoRaf?: boolean;
  rafPriority?: number;
  className?: string;
  children?: React.ReactNode;
};

export default function SmoothScroll({ children, options }: Readonly<SmoothScrollProps>) {
  return (
    <ReactLenis options={options} root>
      {children}
    </ReactLenis>
  );
}
