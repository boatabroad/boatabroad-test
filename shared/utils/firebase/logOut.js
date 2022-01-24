import { getAuth, signOut } from 'firebase/auth';

export const logOut = () => {
  const auth = getAuth();

  return signOut(auth).catch((error) => {
    console.error('error logging out', error);
    throw error;
  });
};
