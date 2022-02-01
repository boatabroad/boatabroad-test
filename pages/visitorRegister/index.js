import React from 'react';
import IfNotLoggedIn from 'components/IfNotLoggedIn';
import VisitorRegisterComponent from 'components/visitorRegisterComponent';

const VisitorRegister = () => {
  return (
    <IfNotLoggedIn>
      <VisitorRegisterComponent />
    </IfNotLoggedIn>
  );
};

export default VisitorRegister;
