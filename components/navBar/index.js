import Logo from 'components/logo';
import UserPictureNav from 'components/userPictureNav';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import style from './navBar.module.scss';

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

  return (
    <div className={style.navBar}>
      <Logo size={80} src="/images/logoWhite.png" background="#56c0c2" />
      <UserPictureNav />
      <div className={style.linkText}>
        {routes.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              <a
                style={{
                  color: pathname === item.href ? '#00bfc1' : 'grey',
                  cursor: 'pointer',
                  marginLeft: '1em',
                }}
              >
                {item.name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
