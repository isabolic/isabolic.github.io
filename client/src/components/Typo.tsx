interface TypoProps {
  text: string;
  delimiter?: string;
  elsClass?: string;
}

export const Typo = ({ text, delimiter, elsClass }: TypoProps) => {
  return (
    <>
      {text.split(delimiter ?? "").map((c, i) => (
        <span
          key={i}
          className={`${elsClass} typo ${c !== " " ? "" : "empty"}`}
        >
          {c}
        </span>
      ))}
    </>
  );
};
