import { CubesLoader } from "./CubesLoader";

export const LoadingScreen = () => (
  <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
    <CubesLoader classNameItem="border-cyan" />
  </div>
);
