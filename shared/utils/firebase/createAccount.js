import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const createAccount = (email, password, role) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      return axios.patch(`/api/users/${user.uid}`, { role }).catch((error) => {
        console.error('error setting user role', error);
      });
    })
    .catch((error) => {
      console.error('error creating account', error);
      throw error;
    });
};
