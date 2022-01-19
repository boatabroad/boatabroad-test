import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const createAccount = (email, password) => {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('error creating account', errorCode, errorMessage);
      throw error;
    });
};

console.log('remove this');
