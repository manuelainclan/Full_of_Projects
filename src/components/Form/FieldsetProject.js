const FieldsetProject = ({ data, handleInput, message, messageErrorClass }) => {
  return (
    <fieldset className="project-fieldset">
      <legend className="legend">
        <p className="legend-text">Cuéntanos sobre el proyecto</p>
        <hr className="legend-line" />
      </legend>
      <label className="form-label">
        {" "}
        Nombre del proyecto:
        <input
          className="input"
          type="text"
          placeholder="Nombre del proyecto"
          name="name"
          id="el nombre del proyecto"
          minLength="2"
          required
          value={data.name}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.name}`}>{message.name}</small>
      <label className="form-label">
        Slogan:
        <input
          className="input"
          type="text"
          name="slogan"
          id="el eslogan"
          placeholder="Slogan"
          minLength="2"
          required
          value={data.slogan}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.slogan}`}>
        {message.slogan}
      </small>
      <label className="form-label">
        {" "}
        Repo:
        <input
          className="input"
          type="text"
          name="repo"
          id="el repositorio"
          placeholder="Repo (copia y pega la url directamente)"
          required
          value={data.repo}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.repo}`}>{message.repo}</small>
      <label className="form-label">
        Demo:
        <input
          className="input"
          type="text"
          placeholder="Demo (copia y pega la url directamente)"
          name="demo"
          id="demo"
          required
          value={data.demo}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.demo}`}>{message.demo}</small>
      <label className="form-label">
        Tecnologías:
        <input
          className="input"
          type="text"
          placeholder="Tecnologías"
          name="technologies"
          id="las tecnologías usadas"
          required
          value={data.technologies}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.technologies}`}>
        {message.technologies}
      </small>
      <label className="form-label">
        Descripción:
        <textarea
          className="textarea"
          type="text"
          placeholder="Descripción"
          name="desc"
          id="la descripción del proyecto"
          required
          value={data.desc}
          onInput={handleInput}
          maxLength="500ch"
        ></textarea>
      </label>
      <small className={`error-message ${messageErrorClass.desc}`}>{message.desc}</small>
    </fieldset>
  );
};

export default FieldsetProject;
