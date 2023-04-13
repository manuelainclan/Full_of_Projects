const Header = ({ logoFop, logo }) => {
  return (
    <header className="header">
      <a className="link header-title" href="https://full-of-projects.onrender.com">
        <img src={logoFop} alt="" className="logo-fop" />
      </a>
      <a href="https://www.adalab.es" target="blank">
        <img src={logo} alt="" className="logo" />
      </a>
    </header>
  );
};

export default Header;
