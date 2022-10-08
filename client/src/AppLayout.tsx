import { Outlet, useLocation } from "react-router";
import { animated, useTransition } from "react-spring";
import { AnimationMenu } from "./components/AnimationMenu";

export const AppLayout = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: {
      opacity: 0,
      transform: "translate3d(100vw, 0, 0)",
    },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  });

  return (
    <div className="flex h-screen">
      <AnimationMenu />
      <div className="w-full overflow-hidden flex grow">
        {transitions((styles) => (
          <animated.div className="flex w-full" style={styles}>
            <Outlet></Outlet>
          </animated.div>
        ))}
      </div>
    </div>
  );
};
