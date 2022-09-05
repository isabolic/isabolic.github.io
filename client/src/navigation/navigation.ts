import { HomeRoute } from "./../pods/HomeRoute";

export const Routes = {
  home: "/",
};

interface NavigationItem {
  name: string;
  path: string;
  text: string;
  allowAnonymous?: boolean;
  component: () => JSX.Element;
}

const navigationList: NavigationItem[] = [];

navigationList.push({
  name: "home",
  path: Routes.home,
  text: "Home",
  allowAnonymous: true,
  component: HomeRoute,
});

export { navigationList };
