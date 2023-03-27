const FieldsetAuthor = ({ data, handleInput, message, messageErrorClass }) => {
  return (
    <fieldset className="autor-fieldset">
      <legend className="legend">
        <p className="legend-text">Cuéntanos sobre la autora</p>
        <hr className="legend-line" />
      </legend>
      <label className="form-label">
        {" "}
        Nombre:
        <input
          className="input"
          type="text"
          placeholder="Nombre"
          name="autor"
          id="tu nombre personal"
          required
          value={data.autor}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.autor}`}>{message.autor}</small>

      <label className="form-label">
        Trabajo:
        <input
          className="input"
          type="text"
          placeholder="Trabajo"
          name="job"
          id="tu profesión"
          required
          value={data.job}
          onInput={handleInput}
        />
      </label>
      <small className={`error-message ${messageErrorClass.job}`}>{message.job}</small>
    </fieldset>
  );
};

export default FieldsetAuthor;
