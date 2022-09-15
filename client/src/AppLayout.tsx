import { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { Menu } from "./components/Menu";

export const AppLayout = (props: PropsWithChildren<{}>) => {
  return (
    <div className="grid grid-cols-layout gap-4">
      <Menu />
      <Outlet></Outlet>
    </div>
  );
};
