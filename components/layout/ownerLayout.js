import React, { useState } from 'react';
import LateralMenu from 'components/lateralMenu';
import NavBar from 'components/navBar';
import style from './style.module.scss';
import MobileNav from 'components/mobileNav';
import MobileBottomTabs from 'components/mobileBottomTabs';

const OwnerLayout = ({ children }) => {
  const [lateralMenuOpen, setLateralMenuOpen] = useState(false);

  const clickToOpen = () => {
    if (lateralMenuOpen === true) {
      setLateralMenuOpen(false);
    } else {
      setLateralMenuOpen(true);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <MobileNav />
      <div className={style.bottom}>
        {lateralMenuOpen && <LateralMenu />}
        <div className={style.circularButton} onClick={clickToOpen}>
          {lateralMenuOpen ? '< Hide' : 'Show >'}
        </div>
        {children}
        <MobileBottomTabs />
      </div>
    </div>
  );
};

export default OwnerLayout;
