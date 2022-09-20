import { CenterContainer, Typo } from "../components";
import TagsCanvas from "react-tags-canvas";
import { useMeasure, useWindowSize } from "react-use";

export const AboutRoute = () => {
  const { width: wWidth } = useWindowSize();

  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  return (
    <div className="relative flex w-full">
      <CenterContainer>
        <h1 className="title text-cyan text-white lg:text-6xl md:text-4xl sm:text-2xl text-xl">
          <Typo elsClass="animate__animated hover-heartBeat" text="About Me" />
        </h1>
        <p className="text-xl paragraph text-white whitespace-pre-wrap">
          <br />
          Born 29.04.1988, in Zagreb, Croatia. Started developing at the age of
          19. {"\n"} I have a serious passion for UI and UX animations and
          creating intuitive user experiences. {"\n"} Fan of outdoor activities,
          TV series, and father of two fractious kids. {"\n"} Interested in the
          entire frontend spectrum and working on ambitious projects with
          positive people.
          <br />
        </p>
      </CenterContainer>
      {wWidth > 1000 && (
        <div ref={ref} className="absolute w-full h-full">
          <TagsCanvas
            textColour="#21FDDC"
            maxSpeed={0.06}
            freezeActive={true}
            shuffleTags={true}
            height={height}
            width={width}
            zoom={1}
            wheelZoom={false}
            noSelect={true}
            textFont={"League Spartan"}
            freezeDecel={true}
            textHeight={50}
            fadeIn={3000}
            initial={[0.3, -0.1]}
            depth={0}
            tags={[
              { value: "Javascript", weight: 50 },
              { value: "React", weight: 50 },
              { value: "Typescript", weight: 50 },
              { value: "Vue", weight: 50 },
              { value: "HTML5", weight: 50 },
              { value: "Oracle PL/SQL", weight: 50 },
              { value: "Oracle Apex", weight: 50 },
              { value: "CSS3", weight: 50 },
              { value: "Git", weight: 50 },
              { value: "Redux", weight: 50 },
              { value: "NodeJS", weight: 50 },
              { value: "NestJS", weight: 50 },
            ]}
          />
        </div>
      )}
    </div>
  );
};
