import Header from '../Header';
import logo from '../../images/logo-adalab.png';
import logoFop from '../../images/logo-fop.png';

const CardDetail = ({ dataCardList }) => {
  const renderCardDetail = () => {
    return dataCardList.map((obj, index) => {
      return (
        <section className="preview">
          <img className="preview-image" src={obj.photo} alt="" />
          <section key={index} className="card">
            <section className="project-info">
              <p className="project-subtitle">Personal Project Card</p>
              <hr className="landing-card-line" />

              <h2 className="project-title">{obj.nameProject}</h2>
              <p className="project-slogan">{obj.slogan}</p>
              <p className="project-desc">{obj.descProject}</p>
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
            <button className="btn-fav" onClick="" id={index}>
              {obj.isFavorite ? (
                <i
                  className="fa-solid fa-star icon-fav"
                  style={{ color: '#fff700' }}
                ></i>
              ) : (
                <i className="fa-regular fa-star icon-fav"></i>
              )}
            </button>
          </section>
        </section>
      );
    });
  };

  return (
    <div className="container">
      <Header
        logoFop={logoFop}
        logo={logo}
        linkTo={'/'}
        title="Volver a la página principal"
      ></Header>
      <main className="mainDetail">{renderCardDetail()}</main>
    </div>
  );
};

export default CardDetail;
