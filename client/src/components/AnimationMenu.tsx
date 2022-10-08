import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { useBreakpoint } from "../util/responsive-breakpoint";
import { Menu } from "./Menu";

enum ToggleState {
    INTIAL,
    OPEN,
    CLOSE
}

export const AnimationMenu = () => {
  const [toggle, set] = useState<ToggleState>(ToggleState.INTIAL);

  const transitions = useTransition(toggle, {
    from : toggle === ToggleState.OPEN || toggle === ToggleState.INTIAL ? { width: '0' } : { width: '100%' },
    enter: toggle === ToggleState.OPEN || toggle === ToggleState.INTIAL ? { width: '100%' } : { width: '0' },
  })

  const breakpoint = useBreakpoint()

  console.log(breakpoint)

  return (
    <>
    <div className="visible lg:hidden p-4 fixed left-0 top-0 z-10" onClick={() => set(ToggleState.OPEN)}>
      <FontAwesomeIcon fontSize={24} icon={["fas", "bars"]} />
    </div>
    { transitions(( style ) =>  breakpoint === "md" || breakpoint === "sm" ? (
      <animated.div
        style={{
          position: "fixed",
          left: 0,
          width: toggle !== ToggleState.INTIAL ? style.width : "0",
          bottom: 0,
          zIndex: 20,
          overflow: "hidden"
        }}>
        <Menu onClose={() => set(ToggleState.CLOSE)}  onClick={() => set(ToggleState.CLOSE)} />
    </animated.div>) :
        <div className="sm:w-[5rem] w-[6rem]">
            <Menu/>
        </div>
    )}
    </>
  );
};
