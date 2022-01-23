import Register from 'components/Register';
import useUser from 'hooks/useUser';

const RegisterPage = () => {
  const user = useUser();

  console.log('user', user);

  return <Register />;
};

export default RegisterPage;
