import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <menu className="flex relative flex-col justify-center items-center h-screen bg-neutral-900">
      <div className="absolute top-5 left-0 w-full">
        <Link to="/" className="flex justify-center">
          <FontAwesomeIcon icon={["fas", "house"]} className="pointer" />
        </Link>
      </div>
      <nav className="flex flex-col py-20 items-center">
        <Link to="/about" className="p-2">
          About
        </Link>
        <Link to="/skills" className="p-2">
          My Skills
        </Link>
        <Link to="/contact" className="p-2">
          Contact
        </Link>
      </nav>
      <ul className="social"></ul>
    </menu>
  );
};
