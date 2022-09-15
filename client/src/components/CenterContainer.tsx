import { PropsWithChildren } from "react";

export const CenterContainer = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="flex justify-center flex-col p-5">{children}</div>;
};
