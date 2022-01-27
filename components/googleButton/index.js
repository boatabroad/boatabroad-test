import React from 'react';
import style from './style.module.scss';

const GoogleButton = ({ onClick }) => {
  return (
    <div className={style.googleLogin} onClick={onClick}>
      <img
        className={style.googleIcon}
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google button"
      />
      <p className={style.googleText}>Continue with Google</p>
    </div>
  );
};

export default GoogleButton;
