import useUser from 'hooks/useUser';
import Image from 'next/image';
import React from 'react';
import style from './userPictureNav.module.scss';

const getAvatarUrl = (user) => {
  if (!user) {
    return null;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.name || user.email
  )}&background=0D8ABC&color=fff&size=40&bold=true`;
};

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
