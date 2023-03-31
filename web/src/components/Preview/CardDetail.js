const CardDetail = ({ dataCardList }) => {
  return dataCardList.map((obj, index) => {
    return (
      <div className="container">
        <section key={index} className="landing-card">
          <div
            className="landing-card-background"
            style={{
              backgroundImage: `url(${obj.photo})`,
            }}
          ></div>
          <button className="btn-remove-card" id={index} onClick="">
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
      </div>
    );
  });
};

export default CardDetail;
