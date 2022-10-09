import { CenterContainer, Typo } from "../components";

export const AboutRoute = () => {
  return (
    <div className="relative flex w-full">
      <CenterContainer>
        <h1 className="title text-cyan text-white lg:text-6xl text-4xl">
          <Typo elsClass="animate__animated hover-heartBeat" text="About Me" />
        </h1>
        <p className="text-xl paragraph text-white whitespace-pre-wrap">
          <br />
          Hello my name is Ivan located in Zagreb, Croatia.{" "} I have a serious passion for {"\n"}UI and UX animations and creating
          intuitive user experiences. {"\n"}
          {"\n"} Fan of outdoor activities, TV
          series, and father of two fractious kids. {"\n"} {"\n"} Interested in the
          entire frontend spectrum.
          <br />
        </p>
      </CenterContainer>
    </div>
  );
};
