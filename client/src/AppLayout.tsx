import { Outlet } from "react-router";
import { Menu } from "./components/Menu";

export const AppLayout = () => {
  return (
    <div className="flex">
      <div className="w-[5rem]">
        <Menu />
      </div>
      <div className="w-full flex grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
