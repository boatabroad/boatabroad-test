import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addRoleToUser } from 'services/api/users';

export const createAccount = (email, password, role) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      return addRoleToUser(user.uid, role);
    })
    .catch((error) => {
      console.error('error creating account', error);
      throw error;
    });
};
