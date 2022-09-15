import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import "./oscillator.css";
import { Oscillator } from "./util";

export const OscillatorComponent = () => {
  useEffect(() => {
    Oscillator.initOciliator(false);
  });

  const { width, height } = useWindowSize();

  return (
    <canvas
      className="oscillator"
      id="canvas"
      width={width}
      height={height}
    ></canvas>
  );
};
