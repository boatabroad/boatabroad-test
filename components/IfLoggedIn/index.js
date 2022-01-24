import useUser from 'hooks/useUser';
import { useRouter } from 'next/router';
import { ClimbingBoxLoader } from 'react-spinners';

const IfLoggedIn = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) {
    return <ClimbingBoxLoader />;
  } else if (!user) {
    router.push('/login');
    return <div />;
  }

  return children;
};

export default IfLoggedIn;
