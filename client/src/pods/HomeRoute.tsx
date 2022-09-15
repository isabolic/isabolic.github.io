import { Typo } from "../components";

export const HomeRoute = () => {
  return (
    <div className="flex justify-center flex-col p-5">
      <h1 className="title text-white">
        <Typo
          elsClass="animate__animated text-6xl hover-pulse-2"
          text="Hi, I'm Ivan, your friendly frontend developer"
        />
      </h1>
      <p className="paragraph">
        <span className="tracking-[.25em]">Frontend developer</span>
      </p>
    </div>
  );
};
