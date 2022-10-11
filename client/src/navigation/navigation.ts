import { AboutRoute } from "../pods/AboutRoute";
import { ContactRoute } from "../pods/ContactRoute";
import { SkillsRoute } from "../pods/SkillsRoutes";
import { HomeRoute } from "./../pods/HomeRoute";

export const Routes = {
  home: "/",
  about: "/about",
  skills: "/skills",
  contact: "/contact",
};

interface NavigationItem {
  name: string;
  path: string;
  text: string;
  component: () => JSX.Element;
}

const navigationList: NavigationItem[] = [];

navigationList.push({
  name: "home",
  path: Routes.home,
  text: "Home",
  component: HomeRoute,
});

navigationList.push({
  name: "about",
  path: Routes.about,
  text: "About",
  component: AboutRoute,
});

navigationList.push({
  name: "skills",
  path: Routes.skills,
  text: "My skills",
  component: SkillsRoute,
});

navigationList.push({
  name: "contact",
  path: Routes.contact,
  text: "Contact",
  component: ContactRoute,
});

export { navigationList };
