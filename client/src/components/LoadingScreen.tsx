import { Loading } from "./Loading";

export const LoadingScreen = () => (
  <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
    <Loading className="w-20 text-cyan h-20" />
  </div>
);
