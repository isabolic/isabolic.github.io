export const Menu = () => {
  return (
    <menu className="flex flex-col justify-between h-screen">
      <div className="flex py-20 justify-center">
        <span>Frontend Developer</span>
      </div>
      <nav className="flex flex-col py-20 justify-center">
        <a rel="about" href="/about">
          About
        </a>
        <a rel="skills" href="/skills">
          My Skills
        </a>
        <a rel="contact" href="/contact">
          Contact
        </a>
      </nav>
      <ul className="social"></ul>
    </menu>
  );
};
