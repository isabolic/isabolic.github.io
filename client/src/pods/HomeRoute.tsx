import { CenterContainer, OscillatorComponent, Typo } from "../components";
import { usePageTitle } from "../hooks/usePageTitle";

export const HomeRoute = () => {
  usePageTitle();
  return (
    <>
      <OscillatorComponent />
      <CenterContainer>
        <h1 className="title text-white lg:text-6xl text-4xl">
          <Typo
            elsClass="animate__animated hover-pulse-2"
            text="Hi,\n I'm Ivan,\n frontend developer"
          />
        </h1>
        <p className="paragraph">
          <span className="tracking-[.25em] text-cyan">Frontend developer</span>
        </p>
      </CenterContainer>
    </>
  )
};
