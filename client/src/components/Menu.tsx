import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <menu className="flex relative flex-col justify-between items-center h-screen bg-neutral-900">
      <div className="p-4">
        <Link
          to="/"
          className="flex text-cyan animate__animated justify-center hover-flash"
        >
          <FontAwesomeIcon fontSize={24} icon={["fas", "code"]} />
        </Link>
      </div>
      <nav className="menu">
        <Link to="/about" className="menu-item">
          About
        </Link>
        <Link to="/skills" className="menu-item">
          My Skills
        </Link>
        <Link to="/contact" className="menu-item">
          Contact
        </Link>
      </nav>
      <ul className="flex flex-col">
        <li className="p-3">
          <a
            href="https://www.linkedin.com/in/ivan-sabolic-3125b535/"
            target="_blank"
            rel="noreferrer"
            className="block animate__animated hover:text-cyan hover-flip"
          >
            <FontAwesomeIcon fontSize={24} icon={["fab", "linkedin"]} />
          </a>
        </li>
        <li className="p-3">
          <a
            href="https://github.com/isabolic"
            target="_blank"
            rel="noreferrer"
            className="block animate__animated hover:text-cyan hover-flip"
          >
            <FontAwesomeIcon fontSize={24} icon={["fab", "github"]} />
          </a>
        </li>
        <li className="p-3">
          <a
            href="https://www.strava.com/athletes/5766945"
            target="_blank"
            rel="noreferrer"
            className="block animate__animated hover:text-cyan hover-flip"
          >
            <FontAwesomeIcon fontSize={24} icon={["fab", "strava"]} />
          </a>
        </li>
      </ul>
    </menu>
  );
};
