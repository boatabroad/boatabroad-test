import Register from 'components/Register';
import IfNotLoggedIn from 'components/IfNotLoggedIn';

const RegisterPage = () => {
  return (
    <IfNotLoggedIn>
      <Register />
    </IfNotLoggedIn>
  );
};

export default RegisterPage;
