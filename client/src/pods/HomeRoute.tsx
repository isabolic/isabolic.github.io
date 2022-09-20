import { CenterContainer, Typo } from "../components";

export const HomeRoute = () => {
  return (
    <CenterContainer>
      <h1 className="title text-white lg:text-6xl md:text-4xl sm:text-2xl text-xl">
        <Typo
          elsClass="animate__animated  hover-pulse-2"
          text="Hi,\n I'm Ivan,\n your frontend developer"
        />
      </h1>
      <p className="paragraph">
        <span className="tracking-[.25em]">Frontend developer</span>
      </p>
    </CenterContainer>
  );
};
