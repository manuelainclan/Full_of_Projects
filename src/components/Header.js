import { Link } from 'react-router-dom';
const Header = ({ logoFop, logo, linkTo }) => {
  return (
    <header className="header">
      <Link className="link header-title" to={linkTo}>
        <img src={logoFop} alt="" className="logo-fop" />
      </Link>
      {/* <p className="text">Proyectos Molones</p> */}
      <a href="https://www.adalab.es" target="blank">
        <img src={logo} alt="" className="logo" />
      </a>
    </header>
  );
};

export default Header;
