import React, { useEffect } from "react";
import "./oscillator.css";
import { Oscillator } from "./util";

interface OscillatorProps {
  width?: number;
  height?: number;
}

export const OscillatorComponent = ({ width, height }: OscillatorProps) => {
  useEffect(() => {
    Oscillator.initOciliator(false);
  });

  return (
    <canvas
      className="oscillator"
      id="canvas"
      width={width ?? 949}
      height={height ?? 879}
    ></canvas>
  );
};
