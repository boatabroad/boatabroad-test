import useUser from 'hooks/useUser';
import Image from 'next/image';
import React from 'react';
import style from './userPictureNav.module.scss';

const UserPictureNav = () => {
  const data = useUser();

  if (!data) {
    return;
  }

  const { user } = data;
  const name = user?.displayName;
  const userPic = user?.photoURL;

  return (
    <div className={style.userPictureNav}>
      {userPic && (
        <Image
          src={userPic}
          alt="Picture of the author"
          width={40}
          height={40}
          className={userPic ? style.nonGrey : style.pictureCircular}
        />
      )}

      <div className={style.text}>
        <p className={style.paragraph}>Owner</p>
        <h4 className={style.h4}>{name}</h4>
      </div>
    </div>
  );
};

export default UserPictureNav;
