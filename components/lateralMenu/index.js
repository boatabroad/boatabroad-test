import React from 'react';
import style from './lateralMenu.module.scss';

const LateralMenu = () => {
  return (
    <div className={style.lateralMenu}>
      <h3 className={style.title}>Share</h3>
      <p className={style.paragraph}>My boats</p>
      <p className={style.paragraph}>Rent new Boat</p>
      <p className={style.paragraph}>Insight</p>
      <br />
      <br />

      <h3 className={style.title}>Support</h3>
      <p className={style.paragraph}>Messages</p>
      <p className={style.paragraph}>Invoices</p>
      <br />
      <br />

      <h3 className={style.title}>My account</h3>
      <p className={style.paragraph}>My profile</p>
      <p className={style.paragraph}>Log out</p>
    </div>
  );
};

export default LateralMenu;
