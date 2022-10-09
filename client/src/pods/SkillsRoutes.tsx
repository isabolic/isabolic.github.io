import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CenterContainer, Typo } from "../components";
import TagsCanvas from "react-tags-canvas";
import { useMeasure, useWindowSize } from "react-use";

export const SkillsRoute = () => {
  const { width: wWidth } = useWindowSize();
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  return (
    <div className="relative flex w-full">
      <CenterContainer>
        <h1 className="title text-cyan text-white lg:text-6xl text-2xl">
          <Typo
            elsClass="animate__animated hover-headShake"
            text="Weapons of Choice"
          />
        </h1>
        <div className="flex flex-col">
          <p className="paragraph">
            Here are a few technologies I’ve been working with recently:
          </p>
          <div className="flex flex-wrap ml-5">
            <div className="flex items-center p-2 md:w-1/2 w-full">
              <FontAwesomeIcon
                className="-mt-1 text-cyan"
                fontSize={12}
                icon={["fas", "circle-dot"]}
              />
              <p className="ml-2">JavaScript (ES6+)</p>
            </div>
            <div className="flex items-center p-2 md:w-1/2 w-full">
              <FontAwesomeIcon
                className="-mt-1 text-cyan"
                fontSize={12}
                icon={["fas", "circle-dot"]}
              />
              <p className="ml-2">Typescript</p>
            </div>
            <div className="flex items-center p-2 md:w-1/2 w-full">
              <FontAwesomeIcon
                className="-mt-1 text-cyan"
                fontSize={12}
                icon={["fas", "circle-dot"]}
              />
              <p className="ml-2">React</p>
            </div>
            <div className="flex items-center p-2 md:w-1/2 w-full">
              <FontAwesomeIcon
                className="-mt-1 text-cyan"
                fontSize={12}
                icon={["fas", "circle-dot"]}
              />
              <p className="ml-2">Vue</p>
            </div>
          </div>
        </div>
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
              { value: "JQuery", weight: 50 },
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
              { value: "Docker", weight: 50 },
            ]}
          />
        </div>
      )}
    </div>
  );
};
