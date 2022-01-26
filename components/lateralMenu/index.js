import React from 'react';
import Link from 'next/link';
import style from './lateralMenu.module.scss';
import { useRouter } from 'next/router';

const sharePath = [
  {
    name: 'Rent new Boat',
    href: '/dashboard',
  },
  {
    name: 'My Boats',
    href: '/myBoats',
  },
  {
    name: 'Insight',
    href: '/insight',
  },
];

const SupportPath = [
  {
    name: 'Messages',
    href: '/messages',
  },
  {
    name: 'Invoices',
    href: '/invoices',
  },
];

const myAccountPath = [
  {
    name: 'My profile',
    href: '/myProfile',
  },
  {
    name: 'Log out',
    href: '/logOut',
  },
];

const LateralMenu = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={style.lateralMenu}>
      <h3 className={style.title}>Share</h3>
      {sharePath.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <p
              style={{
                color: pathname === item.href ? '#00bfc1' : 'grey',
                cursor: 'pointer',
              }}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
      <br />
      <br />

      <h3 className={style.title}>Support</h3>
      {SupportPath.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <p
              style={{
                color: pathname === item.href ? '#00bfc1' : 'grey',
                cursor: 'pointer',
              }}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
      <br />
      <br />

      <h3 className={style.title}>My account</h3>
      {myAccountPath.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <p
              style={{
                color: pathname === item.href ? '#00bfc1' : 'grey',
                cursor: 'pointer',
              }}
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default LateralMenu;
