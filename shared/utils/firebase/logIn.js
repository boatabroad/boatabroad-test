import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const logIn = (email, password) => {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error('error logging in', error);
    throw error;
  });
};
