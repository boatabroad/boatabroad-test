import Link from 'next/link';
import React from 'react';
import style from './style.module.scss';

const index = () => {
  return (
    <div className={style.container}>
      <Link href="/ownerRegister">
        <a>
          <div className={style.left}>
            <div className={style.textBox}>
              <h1>Rent you Boat?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </p>
              <button className={style.button}>Let's Go!</button>
            </div>
          </div>
        </a>
      </Link>

      <Link href="/visitorRegister">
        <a>
          <div className={style.right}>
            <div className={style.textBox}>
              <h1>Find a Boat</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
              </p>
              <button className={style.button}>Let's Go!</button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default index;
