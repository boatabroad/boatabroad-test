import Image from 'next/image';
import React from 'react';
import style from './logo.module.scss';

const Logo = () => {
  return (
    <Image
      src="/images/logoWhite.png"
      alt="Picture of the author"
      width={40}
      height={40}
      className={style.logo}
    />
  );
};

export default Logo;
