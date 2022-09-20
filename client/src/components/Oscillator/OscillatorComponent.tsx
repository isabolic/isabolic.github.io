import React, { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import "./oscillator.css";
import { Oscillator } from "./util";

export const OscillatorComponent = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Oscillator.initOciliator(false, ref.current!);
  });

  const { width, height } = useWindowSize();

  return (
    <canvas
      className="oscillator"
      ref={ref}
      width={width}
      height={height}
    ></canvas>
  );
};
