import { CenterContainer, Typo } from "../components";

export const AboutRoute = () => {
  return (
    <CenterContainer>
      <h1 className="title text-white lg:text-6xl md:text-4xl sm:text-2xl text-xl">
        <Typo elsClass="animate__animated hover-heartBeat" text="About Me" />
      </h1>
      <p className="paragraph text-white whitespace-pre-wrap">
        <br />
        Born 29.04.1988, in Zagreb, Croatia. Started developing at the age of
        19. {"\n"} I have a serious passion for UI and UX animations and
        creating intuitive user experiences. {"\n"} Fan of outdoor activities,
        TV series, and father of two fractious kids. {"\n"} Interested in the
        entire frontend spectrum and working on ambitious projects with positive
        people.
        <br />
      </p>
    </CenterContainer>
  );
};
