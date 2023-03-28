import Profile from './Profile.js';
import cover from '../../images/preview.jpg';
import Card from './Card';
import { Link } from 'react-router-dom';

const Preview = ({ data }) => {
  return (
    <section className="preview">
      <Profile
        defaultAvatar={cover}
        avatar={data.photo}
        className={'preview-image'}
      />
      <Link to="./CardDetail">
        <Card data={data}></Card>
      </Link>
    </section>
  );
};

export default Preview;
