import React, { useState } from 'react';
import style from './style.module.scss';
import { MenuIcon } from '@heroicons/react/solid';
import { MenuPopup } from 'components/MenuPopup';
import Image from 'next/image';

const MobileNav = () => {
  const [menuPopup, setMenuPopup] = useState(false);

  const clickPopup = () => {
    if (menuPopup === true) {
      setMenuPopup(false);
    } else {
      setMenuPopup(true);
    }
  };
  return (
    <div className={style.container}>
      <Image
        src="/images/logoColor.png"
        alt="Company Logo"
        className={style.logo}
        width={40}
        height={40}
      />
      <MenuIcon onClick={clickPopup} className="h-8 cursor-pointer" />
      {menuPopup && <MenuPopup />}
    </div>
  );
};

export default MobileNav;
