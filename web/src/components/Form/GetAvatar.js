import React from 'react';
import PropTypes from 'prop-types';

function GetAvatar(props) {
  const fr = new FileReader();
  const myFileField = React.createRef();
  const uploadImage = (ev) => {
    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];

      // añado un evento load al manejador de ficheros
      // por qué añado un evento, pues porque esto es una acción asíncrona, imaginemos que el fichero pesa 5 Gb, el navegador puede tardar unos cuantos segundos en cargar y procesar el fichero, por eso le decimos "navegador, cuando termines de cargar el fichero me ejecutas el método  image"
      fr.addEventListener('load', getImage);

      // le digo al manejador de ficheros que maneje, que cargue el fichero
      fr.readAsDataURL(myFile);
    }
  };

  const getImage = () => {
    // cuando el navegador termina de manejar el fichero se ejecuta este método porque lo hemos indicado en  fr.addEventListener('load',  getImage);

    //  fr guarda información útil sobre el fichero cargado
    //console.log('Información útil sobre el fichero cargado', fr);

    //  fr.result contiene los datos del fichero en un formato que se llama base64 que nos vale por que podemos usarlo para pintar una imagen en HTML
    const image = fr.result;

    // aquí hago lifting con los datos del fichero
    // lo que haga el componente madre con esta información es otro problema diferente
    props.updateAvatar(image);
  };

  // const avatar = props.avatar === '' ? props.defaultAvatar : props.avatar;
  return (
    <div className={props.className}>
      <label className="btn-label">
        {props.value}
        <input
          type="file"
          ref={myFileField}
          className="hidden"
          onChange={uploadImage}
        />
      </label>
    </div>
  );
}

GetAvatar.propTypes = {
  // avatar: PropTypes.string.isRequired,
  updateAvatar: PropTypes.func.isRequired,
};

export default GetAvatar;
