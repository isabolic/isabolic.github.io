import { CenterContainer, Typo } from "../components";

export const SkillsRoute = () => {
  return (
    <div className="relative flex w-full">
      <CenterContainer>
        <h1 className="title text-cyan text-white lg:text-6xl text-4xl">
          <Typo
            elsClass="animate__animated hover-headShake"
            text="Skills & Experience"
          />
        </h1>
      </CenterContainer>
    </div>
  );
};
