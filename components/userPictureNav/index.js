import useUser from 'hooks/useUser';
import Image from 'next/image';
import React from 'react';
import { getAvatarUrl } from 'utils/avatars/getAvatarUrl';
import style from './userPictureNav.module.scss';

const UserPictureNav = () => {
  const { user } = useUser();
  const name = user?.displayName;
  const defaultAvatarUrl = getAvatarUrl(user);
  const avatarUrl = user?.photoURL || defaultAvatarUrl;

  return (
    <div className={style.userPictureNav}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Picture of the author"
          width={60}
          height={60}
          className={style.nonGrey}
        />
      ) : (
        <div className={style.pictureCircular}></div>
      )}

      <div className={style.text}>
        <p className={style.paragraph}>Owner</p>
        <h4 className={style.h4}>{name}</h4>
      </div>
    </div>
  );
};

export default UserPictureNav;
