import GetAvatar from './GetAvatar';
import FieldsetProject from './FieldsetProject';
import FieldsetAuthor from './FieldsetAuthor';
import BtnCreateCard from './BtnCreateCard';
import MessageURL from './MessageURL';

const Form = ({
  data,
  message,
  messageErrorClass,
  infoURL,
  isCreatedCard,
  isCompletedForm,
  updateImages,
  updatePhoto,
  handleInput,
  handleClickCreateCard,
  handleResetInput,
}) => {
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <section className="form">
      <h2 className="form-title">Información</h2>
      <button
        className="btn-reset-inputs"
        type="reset"
        title="Borrar los campos"
        onClick={handleResetInput}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      <form onSubmit={handleSubmit}>
        <FieldsetProject
          data={data}
          handleInput={handleInput}
          message={message}
          messageErrorClass={messageErrorClass}
        ></FieldsetProject>
        <FieldsetAuthor data={data} handleInput={handleInput} message={message} messageErrorClass={messageErrorClass}></FieldsetAuthor>

        <section className="buttons-img">
          <GetAvatar
            className={'btn'}
            updateAvatar={updateImages}
            value={'Subir foto de autora'}
          />
          <GetAvatar
            className={'btn'}
            updateAvatar={updatePhoto}
            value={'Subir foto de proyecto'}
          />
        </section>
        <section className="buttons-img">
          <BtnCreateCard
            handleClickCreateCard={handleClickCreateCard}
            value={'CREAR TARJETA'}
          />
        </section>
        <MessageURL
          isCreatedCard={isCreatedCard}
          isCompletedForm={isCompletedForm}
          infoURL={infoURL}
        />
      </form>
    </section>
  );
};

export default Form;
