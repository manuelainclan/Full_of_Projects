import user from '../../images/icono.png';
import Profile from './Profile';

const Card = ({ data }) => {
  return (
    <section className="card">
      <section className="project-info">
        <p className="project-subtitle">Tarjeta sobre el proyecto</p>
        <hr className="card-line" />

        <h2 className="project-title">{data.name || 'Mi proyecto'}</h2>
        <p className="project-slogan">{data.slogan || 'Diseños Exclusivos'}</p>
        <p className="project-desc">
          {data.desc ||
            `En este espacio proporcionaremos la información sobre nuestro proyecto
           que consideremos importante y/o relevante. Te aconsejamos ser breve y concisa, será más sencillo para los demás usuarios que vean tu tarjeta!`}
        </p>
        <section className="tech-icons">
          <section className="project-technologies">
            <p className="text">{data.technologies || 'React JS, MongoDB'}</p>
          </section>
          <section className="section-icons">
            <a href={data.demo} target="blank">
              <i className="fa-solid fa-globe icons" title="Link a demo"></i>
            </a>
            <a href={data.repo} target="blank">
              <i
                className="fa-brands fa-github icons"
                title="Link a repositorio"
              ></i>
            </a>
          </section>
        </section>
      </section>

      <section className="autor-info">
        <Profile
          defaultAvatar={user}
          avatar={data.image}
          className={'autor-image'}
        />
        <p className="autor-job">{data.job || 'Full Stack Developer'}</p>
        <p className="autor-name">{data.autor || 'Tu nombre'}</p>
      </section>
    </section>
  );
};

export default Card;
