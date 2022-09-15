import { PropsWithChildren } from "react";

export const BodyTag = (props: PropsWithChildren<unknown>) => {
  return <div className="bodytag">{props.children}</div>;
};
