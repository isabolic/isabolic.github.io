import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className }: LoadingProps) => (
  <FontAwesomeIcon
    icon={["fas", "circle-notch"]}
    className={`animate-spin text-blue-500 ${className ?? "h-14 w-14"}`}
  />
);
