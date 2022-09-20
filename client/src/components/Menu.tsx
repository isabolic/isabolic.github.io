import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <menu className="flex relative flex-col justify-center items-center h-screen bg-neutral-900">
      <div className="absolute top-5 left-0 w-full">
        <Link to="/" className="flex text-cyan justify-center">
          <FontAwesomeIcon icon={["fas", "house"]} className="pointer" />
        </Link>
      </div>
      <nav className="flex w-full flex-col py-20 items-center">
        <Link to="/about" className="p-2 border-b w-full border-cyan">
          About
        </Link>
        <Link to="/skills" className="p-2 border-b w-full border-cyan">
          My Skills
        </Link>
        <Link to="/contact" className="p-2 border-b w-full border-cyan">
          Contact
        </Link>
      </nav>
      <ul className="social"></ul>
    </menu>
  );
};
