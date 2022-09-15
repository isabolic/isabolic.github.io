import React from "react";

interface TypoProps {
  text: string;
  delimiter?: string;
  elsClass?: string;
}

export const Typo = ({ text, delimiter, elsClass }: TypoProps) => {
  return (
    <>
      {text.split(delimiter ?? "").map((c, i) => (
        <React.Fragment key={i}>
          {c === "," ? (
            <>
              <span className={`${elsClass} typo`}>,</span>
              <br />
            </>
          ) : (
            <span className={`${elsClass} typo ${c !== " " ? "" : "empty"}`}>
              {c}
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
};
