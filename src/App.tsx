import { Link } from "react-router-dom";
import parallaxImg from "/src/assets/images/parallax-sky-full.png";
import magnetImg from "/src/assets/images/magnet-thumbnail.png";
import { cn } from "./lib/tailwind/utils";

const options = [
  {
    id: 1,
    text: "Parallax",
    path: "/parallax",
    image: parallaxImg,
    dark: true,
  },
  {
    id: 2,
    text: "Magnet",
    path: "/magnet",
    image: magnetImg,
    dark: true,
  },
];

export default function App() {
  return (
    <main className={"h-screen bg-black transition-colors duration-500"}>
      <div className={"h-[100%]"}>
        <div className={"flex h-[30%] flex-col justify-center p-16 lg:h-[40%] lg:justify-end lg:gap-2 lg:p-32"}>
          <h1 className={"w-max text-xl font-bold uppercase tracking-widest text-[#fff] lg:text-3xl"}>
            React Motion Design
          </h1>
          <Link to={"https://github.com/ianczm"} className={"text-md w-max uppercase tracking-widest"}>
            github.com/ianczm
          </Link>
        </div>
        <div className={"grid h-[70%] grid-rows-2 lg:h-[60%] lg:grid-cols-2 lg:grid-rows-none"}>
          {options.map((option) => (
            <Link key={option.id} to={option.path} className={"relative block h-full"}>
              <img src={option.image} alt="" className={"block h-full w-full object-cover"} />
              <div className={"absolute bottom-0 left-0 right-0 top-0 flex items-end justify-start p-16"}>
                <h2 className={cn("text-xl font-bold", option.dark ? "text-white" : "text-black")}>{option.text}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
