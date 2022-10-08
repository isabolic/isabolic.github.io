import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MenuProps {
  onClick?: () => void;
  onClose?: () => void;
}

export const Menu = ({onClick, onClose}: MenuProps) => {
  return (
    <menu className="flex relative flex-col justify-between items-center h-screen bg-neutral-900">
      {onClose &&
      <div className="absolute right-0 top-0 p-4 z-30" onClick={onClose}>
        <FontAwesomeIcon fontSize={24} icon={["fas", "xmark"]} />
      </div>
      }
      <div className="p-4">
        <Link
          to="/"
          className="flex text-cyan animate__animated justify-center hover-flash"
          onClick={onClick}
        >
          <FontAwesomeIcon fontSize={24} icon={["fas", "code"]} />
        </Link>
      </div>
      <nav className="menu">
        <Link to="/about" onClick={onClick} className="menu-item">
          About
        </Link>
        <Link to="/skills" onClick={onClick} className="menu-item">
          My Skills
        </Link>
        <Link to="/contact" onClick={onClick} className="menu-item">
          Contact
        </Link>
      </nav>
      <ul className="flex lg:flex-col">
        <li className="p-5 lg:p-3">
          <a
            href="https://www.linkedin.com/in/ivan-sabolic-3125b535/"
            target="_blank"
            onClick={onClick}
            rel="noreferrer"
            className="block animate__animated hover:text-cyan hover-flip"
          >
            <FontAwesomeIcon fontSize={24} icon={["fab", "linkedin"]} />
          </a>
        </li>
        <li className="p-5 lg:p-3">
          <a
            href="https://github.com/isabolic"
            target="_blank"
            rel="noreferrer"
            onClick={onClick}
            className="block animate__animated hover:text-cyan hover-flip"
          >
            <FontAwesomeIcon fontSize={24} icon={["fab", "github"]} />
          </a>
        </li>
        <li className="p-5 lg:p-3">
          <a
            href="https://www.strava.com/athletes/5766945"
            target="_blank"
            onClick={onClick}
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
