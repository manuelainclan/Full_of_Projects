import logoFop from '../images/logo-fop.png';
import logo from '../images/logo-adalab.png';
import { useEffect, useState } from 'react';
import dataApi from '../service/api';
import ls from '../service/localStorage';
import Header from './Header';
import Preview from './Preview/Preview';
import Form from './Form/Form';

function CreateProject({ dataCardList, setDataCardList }) {
  const [message, setMessage] = useState({});
  const [messageErrorClass, setMessageErrorClass] = useState({});

  const defaultData = {
    name: '',
    slogan: '',
    technologies: '',
    repo: '',
    demo: '',
    desc: '',
    autor: '',
    job: '',
    image: '',
    photo: '',
  };

  const [data, setData] = useState(ls.get('dataLS', defaultData));

  const [infoURL, setinfoURL] = useState('');

  const [isCreatedCard, setIsCreatedCard] = useState(false);

  const [isCompletedForm, setCompletedForm] = useState(false);

  // expresion regular dayana /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]*$/

  useEffect(() => {
    ls.set('dataLS', data);
  }, [data]);

  useEffect(() => {
    ls.set('dataCardLS', dataCardList);
  }, [dataCardList]);

  const updateImages = (avatar) => {
    setData({ ...data, image: avatar });
    setIsCreatedCard(false);
    setinfoURL('');
  };
  const updatePhoto = (avatar) => {
    setData({ ...data, photo: avatar });
    setIsCreatedCard(false);
    setinfoURL('');
  };

  const pattern = new RegExp('^https?://[/#?]?.*$');

  const handleInput = (ev) => {
    const inputValue = ev.target.value;
    const inputName = ev.target.name;
    const inputId = ev.target.id;
    setIsCreatedCard(false);
    setinfoURL('');
    if (inputName === 'repo' || inputName === 'demo') {
      if (pattern.test(inputValue)) {
        setData({ ...data, [inputName]: inputValue });
        setMessageErrorClass({ ...messageErrorClass, [inputName]: '' });
      } else {
        setMessage({ ...message, [inputName]: 'Introduce una URL válida' });
        setMessageErrorClass({
          ...messageErrorClass,
          [inputName]: 'error-message-display',
        });
      }
    } else {
      if (!inputValue) {
        setMessage({
          ...message,
          [inputName]: `Rellena este campo con ${inputId}`,
        });
        setMessageErrorClass({
          ...messageErrorClass,
          [inputName]: 'error-message-display',
        });
      } else {
        setData({ ...data, [inputName]: inputValue });
        setMessageErrorClass({ ...messageErrorClass, [inputName]: '' });
      }
    }
  };

  const handleClickCreateCard = (ev) => {
    ev.preventDefault();
    dataApi(data).then((info) => {
      console.log(info);
      if (info.success) {
        setCompletedForm(true);
        setIsCreatedCard(true);
        setinfoURL(info.cardURL);
        dataCardList.unshift(data);
        setDataCardList([...dataCardList]);
        setData(defaultData);
      } else {
        setIsCreatedCard(true);
        setCompletedForm(false);
      }
    });
  };

  const handleResetInput = () => {
    ls.remove('dataLS');
    setData(defaultData);
    setMessageErrorClass('');
    setIsCreatedCard(false);
    setinfoURL('');
  };

  return (
    <div className="container">
      <Header
        logoFop={logoFop}
        logo={logo}
        linkTo={'/'}
        title="Volver a la página principal"
      ></Header>
      <main className="main">
        <Preview data={data}></Preview>
        <Form
          message={message}
          messageErrorClass={messageErrorClass}
          data={data}
          infoURL={infoURL}
          isCreatedCard={isCreatedCard}
          isCompletedForm={isCompletedForm}
          updateImages={updateImages}
          updatePhoto={updatePhoto}
          handleInput={handleInput}
          handleClickCreateCard={handleClickCreateCard}
          handleResetInput={handleResetInput}
        ></Form>
      </main>
    </div>
  );
}

export default CreateProject;
