import LateralMenu from 'components/lateralMenu';
import NavBar from 'components/navBar';
import React from 'react';

const OwnerLayout = ({ children }) => {
  return (
    <div className="container">
      <NavBar />
      <div className="bottom">
        <LateralMenu />
        {children}
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-wrap: wrap;
        }
        .bottom {
          width: 100vw;
          background: #f9f9f9;
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default OwnerLayout;
