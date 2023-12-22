export default function ErrorPage() {
  return (
    <main>
      <div className={"flex h-screen w-full flex-col items-center justify-center gap-4"}>
        <h1 className={"text-3xl font-bold"}>Oops!</h1>
        <p>Sorry, an unexpected error has occured.</p>
      </div>
    </main>
  );
}
