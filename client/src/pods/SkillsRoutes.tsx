import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CenterContainer, Typo } from "../components";

export const SkillsRoute = () => {
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
    </div>
  );
};
