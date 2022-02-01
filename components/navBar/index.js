import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserPictureNav from 'components/userPictureNav';
import { MenuPopup } from 'components/MenuPopup';
import { MenuAlt4Icon } from '@heroicons/react/solid';

import style from './navBar.module.scss';
import Image from 'next/image';

const routes = [
  {
    href: '/',
    name: 'Home',
  },
  {
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    href: '/help',
    name: 'Help',
  },
];

const NavBar = () => {
  const router = useRouter();
  const { pathname } = router;
  const [menuPopup, setMenuPopup] = useState(false);

  const clickPopup = () => {
    if (menuPopup === true) {
      setMenuPopup(false);
    } else {
      setMenuPopup(true);
    }
  };

  return (
    <div className={style.navBar}>
      <Image
        src="/images/logoWhite.png"
        alt="Company Logo"
        className={style.logo}
        width={80}
        height={80}
      />
      <UserPictureNav />
      <div className={style.linkText}>
        {routes.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <a
                style={{
                  color: pathname === item.href ? '#00bfc1' : 'grey',
                  cursor: 'pointer',
                  margin: '0 2em',
                }}
                className="space-x-2"
              >
                {item.name}
              </a>
            </Link>
          );
        })}
      </div>
      <MenuAlt4Icon onClick={clickPopup} className="h-8 cursor-pointer" />
      {menuPopup && <MenuPopup />}
    </div>
  );
};

export default NavBar;
