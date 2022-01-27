import Image from 'next/image';
import React from 'react';
import style from './logo.module.scss';

const Logo = ({ size, src }) => {
  return (
    <Image
      // src="/images/logoWhite.png"
      src={src}
      alt="Picture of the author"
      width={size}
      height={size}
      className={style.logo}
    />
  );
};

export default Logo;
