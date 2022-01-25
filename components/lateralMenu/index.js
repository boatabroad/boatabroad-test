import React from 'react';
import style from './lateralMenu.module.scss';

const LateralMenu = () => {
  return (
    <div className={style.lateralMenu}>
      <h3 className={style.title}>Share</h3>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
      <br />
      <br />

      <h3 className={style.title}>Support</h3>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
      <br />
      <br />

      <h3 className={style.title}>My account</h3>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
      <p className={style.paragraph}>item</p>
    </div>
  );
};

export default LateralMenu;
