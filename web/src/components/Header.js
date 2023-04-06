const Header = ({ logoFop, logo }) => {
  return (
    <header className="header">
      <a className="link header-title" href="http://localhost:4000">
        <img src={logoFop} alt="" className="logo-fop" />
      </a>
      <a href="https://www.adalab.es" target="blank">
        <img src={logo} alt="" className="logo" />
      </a>
    </header>
  );
};

export default Header;
