export const Menu = () => {
  return (
    <menu className="flex flex-col justify-center items-center h-screen bg-neutral-900">
      <nav className="flex flex-col py-20 items-center">
        <a rel="about" className="p-2" href="/about">
          About
        </a>
        <a rel="skills" className="p-2" href="/skills">
          My Skills
        </a>
        <a rel="contact" className="p-2" href="/contact">
          Contact
        </a>
      </nav>
      <ul className="social"></ul>
    </menu>
  );
};
