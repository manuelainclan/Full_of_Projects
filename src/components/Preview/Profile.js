import React from 'react';
import PropTypes from 'prop-types';

function Profile({ avatar, className, defaultAvatar }) {
  const avatarImg = avatar === '' ? defaultAvatar : avatar;
  return <img className={className} src={avatarImg} alt="" />;
}

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
};

export default Profile;
