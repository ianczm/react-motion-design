import Spline from "@splinetool/react-spline";
import { Box } from "lucide-react";
import { cn } from "../../lib/tailwind/utils";
import SmoothScroll from "../../providers/smooth-scroll";
import { useWindowSize } from "@uidotdev/usehooks";

function Logo({ className, ...attributes }: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...attributes} className={className}>
      <span className={"bg-none text-lg font-medium text-white"}>Block</span>
    </div>
  );
}

function Step({
  step = 1,
  children,
  className,
  ...attributes
}: Readonly<{ step: number; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      {...attributes}
      className={cn("flex w-max items-center rounded-lg border border-[rgba(255,255,255,0.1)] p-1", className)}
    >
      <div
        className={
          "flex h-8 w-8 flex-col items-center justify-center rounded-md bg-[rgba(255,255,255,0.1)] backdrop-blur-sm"
        }
      >
        <span
          className={
            "inline-block bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text font-bold text-transparent"
          }
        >
          {step}
        </span>
      </div>
      <h2
        className={
          "inline-block max-w-max bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text px-3 font-bold uppercase tracking-wider text-transparent"
        }
      >
        {children}
      </h2>
    </div>
  );
}

function TryButton({
  className,
  children,
  ...attributes
}: Readonly<React.HTMLAttributes<HTMLButtonElement>> & {
  children?: React.ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-block max-w-max rounded-full bg-[#a7ceff] px-6 py-3 text-base font-bold text-black",
        className,
      )}
      {...attributes}
    >
      {children ?? "Try for 30 days"}
    </button>
  );
}

function Paragraph({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p
      className={
        "max-w-max bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text font-medium text-transparent opacity-80 md:leading-loose"
      }
    >
      {children}
    </p>
  );
}

function FinePrint({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <small
      className={
        "max-w-max bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-base font-medium text-transparent opacity-60"
      }
    >
      {children}
    </small>
  );
}

function Heading({ children, large }: Readonly<{ children: React.ReactNode; large?: boolean }>) {
  return (
    <h1
      className={cn(
        "max-w-max bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text font-bold !leading-snug text-transparent md:!leading-tight",
        large ? "text-4xl md:text-6xl lg:text-7xl" : "text-3xl md:text-5xl lg:text-6xl",
      )}
    >
      {children}
    </h1>
  );
}

export default function SplineCubePage() {
  const size = useWindowSize();

  return (
    <SmoothScroll>
      <div className={"relative text-lg"}>
        <nav className={"fixed top-0 z-10 w-full p-8"}>
          <div className={"mx-auto flex max-w-screen-xl items-center justify-between"}>
            <Logo />
            <TryButton>{size.width! < 768 ? <Box /> : "Try for 30 days"}</TryButton>
          </div>
        </nav>
        <main>
          <div className={"relative w-full"}>
            <div className={"fixed top-0 -z-10 h-screen w-full bg-[#070935]"}>
              <Spline scene="https://prod.spline.design/V-txjPggKl0w9EKt/scene.splinecode" />
            </div>
            <div className={"mx-auto box-content max-w-screen-xl px-8"}>
              <section className={"flex h-screen w-[75%] flex-col justify-center gap-6 sm:w-[50%]"}>
                <h2
                  className={
                    "max-w-max bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text font-medium text-transparent"
                  }
                >
                  Introducing <Logo className={"inline-block"} />
                </h2>
                <Heading large>Growing your stocks with data</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, quae consectetur voluptate quod
                  repellat voluptatem!
                </Paragraph>
              </section>
              <section className={"flex h-screen w-[75%] flex-col justify-center gap-6 sm:w-[50%]"}>
                <Step step={1}>Grow</Step>
                <Heading>Grow your wealth in steps</Heading>
                <Paragraph>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptatibus error ducimus!
                </Paragraph>
                <FinePrint>* Lorem ipsum dolor sit amet consectetur adipisicing elit.</FinePrint>
              </section>
              <section className={"ml-auto flex h-screen w-[75%] flex-col justify-center gap-6 sm:w-[50%]"}>
                <Step step={2}>Multiply</Step>
                <Heading>Multiply your holdings</Heading>
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni id nemo quibusdam repudiandae, ipsum
                  vitae? Laborum ab suscipit adipisci consequuntur.
                </Paragraph>
                <FinePrint>* Lorem ipsum dolor sit amet consectetur adipisicing elit.</FinePrint>
              </section>
              <section
                className={
                  "mx-auto flex h-screen w-[75%] flex-col items-center justify-center gap-6 text-center sm:w-[50%]"
                }
              >
                <Heading large>Are you in?</Heading>
                <Paragraph>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita aspernatur perspiciatis consequatur
                  cupiditate iure temporibus.
                </Paragraph>
                <TryButton className={"mt-4"} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
