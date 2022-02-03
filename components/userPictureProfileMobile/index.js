import React from 'react';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import style from './style.module.scss';
import { getAvatarUrl } from 'utils/avatars/getAvatarUrl';

const UserPictureProfileMobile = () => {
  const { user } = useUser();

  const name = user?.displayName;
  const defaultAvatarUrl = getAvatarUrl(user);
  const avatarUrl = user?.photoURL || defaultAvatarUrl;

  console.log('avatarUrl', avatarUrl);

  return (
    <div className={style.userPictureNav}>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Picture of the author"
          width={40}
          height={40}
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

export default UserPictureProfileMobile;
