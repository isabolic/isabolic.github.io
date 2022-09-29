import { PropsWithChildren } from "react";

interface CenterContainerProps {
  className?: string;
}

export const CenterContainer = ({
  children,
  className,
}: PropsWithChildren<CenterContainerProps>) => {
  return (
    <div className={`flex justify-center p-5 ${className ?? "flex-col"}`}>
      {children}
    </div>
  );
};
