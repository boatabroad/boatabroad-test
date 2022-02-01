import React from 'react';
import Link from 'next/link';
import style from './lateralMenu.module.scss';
import { useRouter } from 'next/router';
import { sharePath, myAccountPath, supportPath } from 'constants/routesPath';

const LateralMenu = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={style.lateralMenu}>
      <h3 className={style.title}>Share</h3>
      {sharePath.map((item, index) => {
        const color = pathname === item.href ? '#00bfc1' : 'grey';
        return (
          <Link href={item.href} key={index}>
            <div className={style.iconAndText}>
              <item.Icon color={color} className={style.icon} />
              <p
                style={{
                  color: pathname === item.href ? '#00bfc1' : 'grey',
                  cursor: 'pointer',
                }}
              >
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
      <br />
      <br />

      <h3 className={style.title}>Support</h3>
      {supportPath.map((item, index) => {
        const color = pathname === item.href ? '#00bfc1' : 'grey';
        return (
          <Link href={item.href} key={index}>
            <div className={style.iconAndText}>
              <item.Icon color={color} className={style.icon} />

              <p
                style={{
                  color: pathname === item.href ? '#00bfc1' : 'grey',
                  cursor: 'pointer',
                }}
              >
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
      <br />
      <br />

      <h3 className={style.title}>My account</h3>
      {myAccountPath.map((item, index) => {
        const color = pathname === item.href ? '#00bfc1' : 'grey';
        return (
          <Link href={item.href} key={index}>
            <div className={style.iconAndText}>
              <item.Icon color={color} className={style.icon} />
              <p
                style={{
                  color: pathname === item.href ? '#00bfc1' : 'grey',
                  cursor: 'pointer',
                }}
              >
                {item.name}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LateralMenu;
