import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import { ClimbingBoxLoader } from 'react-spinners';

const IfLoggedIn = ({ children }) => {
  const { user, loading, role } = useUser();
  const router = useRouter();

  console.log('user', user);
  console.log('role', role);
  console.log('loading', loading);

  if (loading) {
    return <ClimbingBoxLoader />;
  } else if (!user) {
    router.push('/login');
    return <div />;
  }

  return children;
};

export default IfLoggedIn;
