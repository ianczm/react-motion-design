import Spline from "@splinetool/react-spline";

export default function SplinePage() {
  return (
    <main>
      <div className={"relative h-screen"}>
        <div
          className={
            "pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end gap-2 p-8 lg:p-16"
          }
        >
          <h1 className={"text-4xl font-bold uppercase tracking-widest lg:text-6xl"}>
            Warm Glowy <br />
            3D Bois
          </h1>
          <h2 className={"lg:text-md text-sm uppercase tracking-widest"}>I stole this from the Spline Community</h2>
        </div>
        <Spline scene="https://prod.spline.design/0g1zW75s65l3Mby1/scene.splinecode" />
      </div>
    </main>
  );
}
