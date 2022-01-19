import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export const createAccount = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('error creating account', errorCode, errorMessage);
    });
};
