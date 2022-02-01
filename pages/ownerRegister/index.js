import React from 'react';
import IfNotLoggedIn from 'components/IfNotLoggedIn';
import OwnerRegisterComponent from 'components/ownerRegisterComponent';

const OwnerRegister = () => {
  // tenant: inqulino
  // owner: dueño
  return (
    <IfNotLoggedIn>
      <OwnerRegisterComponent />
    </IfNotLoggedIn>
  );
};

export default OwnerRegister;
