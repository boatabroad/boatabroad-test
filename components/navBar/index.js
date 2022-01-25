import Logo from 'components/logo';
import UserPictureNav from 'components/userPictureNav';
import React from 'react';
import style from './navBar.module.scss';

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <Logo />
      <UserPictureNav />
    </div>
  );
};

export default NavBar;