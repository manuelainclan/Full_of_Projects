import { Link } from 'react-router-dom';
import Header from './Header';
import logo from '../images/logo-adalab.png';
import logoFop from '../images/logo-fop.png';
import ls from '../service/localStorage';
import '../styles/App.scss';
import { useState } from 'react';

const Landing = ({ setDataCardList, dataCardList }) => {
  const [searchA, setSearchA] = useState('');
  const [searchP, setSearchP] = useState('');
  const handleFav = (ev) => {
    const position = ev.currentTarget.id;
    const newArray = [...dataCardList];
    newArray[position].isFavorite = !newArray[position].isFavorite;
    setDataCardList(newArray);
  };
  const handleBtnRemoveCard = (ev) => {
    const position = ev.currentTarget.id;
    const newArray = [...dataCardList];
    newArray.splice(position, 1);
    ls.set('dataCardLS', newArray);
    setDataCardList(newArray);
  };
  const renderCard = () => {
    return dataCardList
      .filter((obj) => {
        return obj.autor
          .toLocaleLowerCase()
          .includes(searchA.toLocaleLowerCase());
      })
      .filter((obj) => {
        return obj.name
          .toLocaleLowerCase()
          .includes(searchP.toLocaleLowerCase());
      })
      .map((obj, index) => {
        return (
          <li key={index} className="landing-card">
            <div
              className="landing-card-background"
              style={{
                backgroundImage: `url(${obj.photo})`,
              }}
            ></div>
            <button
              className="btn-remove-card"
              id={index}
              onClick={handleBtnRemoveCard}
            >
              {/* <i className="fa-sharp fa-solid fa-circle-xmark icons"></i> */}
              <i className="fa-solid fa-trash icons"></i>
            </button>
            <section className="project-info">
              <p className="project-subtitle">Personal Project Card</p>
              <hr className="landing-card-line" />

              <h2 className="project-title">{obj.name}</h2>
              <p className="project-slogan">{obj.slogan}</p>
              <p className="project-desc">{obj.desc}</p>
              <section className="tech-icons">
                <section className="project-technologies">
                  <p className="text">{obj.technologies}</p>
                </section>
              </section>
            </section>

            <section className="autor-info">
              <img
                className="autor-image"
                src={obj.image}
                alt="Foto de la autora"
              />
              <p className="autor-job">{obj.job}</p>
              <p className="autor-name">{obj.autor}</p>
            </section>
            <button className="btn-fav" onClick={handleFav} id={index}>
              {obj.isFavorite ? (
                <i
                  className="fa-solid fa-star icon-fav"
                  style={{ color: '#fff700' }}
                ></i>
              ) : (
                <i className="fa-regular fa-star icon-fav"></i>
              )}
            </button>
          </li>
        );
      });
  };

  const handleInputA = (ev) => {
    ev.preventDefault();
    setSearchA(ev.target.value);
  };

  const handleInputP = (ev) => {
    setSearchP(ev.target.value);
  };
  const handleResetCards = () => {
    ls.remove('dataCardLS');
    setDataCardList([]);
  };

  return (
    <div className="container">
      <Header logoFop={logoFop} logo={logo} linkTo={''} />
      <main>
        <h1 className="landing-title">Proyectos Molones</h1>
        <h2 className="landing-subtitle">
          Escaparate en línea para recoger ideas a través de la tecnología
        </h2>
        <section className="landing-buttons">
          <Link
            className="link btn-large"
            to="/create"
            title="Crear una nueva tarjeta"
          >
            Nuevo proyecto
          </Link>
          <Link
            className="link btn-large"
            to="/CardDetail"
            title="Detalle de Tarjeta"
          >
            Detalle de Tarjeta
          </Link>
          <button
            className="btn-reset-cards"
            onClick={handleResetCards}
            title="Borrar las tarjetas"
          >
            Borrar proyectos
          </button>
        </section>
        <form className="ld-form">
          <label className="ld-form-label-filter">Filtrar por Proyecto</label>
          <input
            type="text"
            className="ld-form-input-filter"
            onChange={handleInputP}
            value={searchP}
          ></input>
          <label className="ld-form-label-filter">Filtrar por Autora</label>
          <input
            type="text"
            className="ld-form-input-filter"
            onChange={handleInputA}
            value={searchA}
          ></input>
        </form>

        <ul className="landing-ul">{renderCard()}</ul>
      </main>
    </div>
  );
};

export default Landing;
