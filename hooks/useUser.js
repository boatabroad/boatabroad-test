import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'shared/utils/firebase';

const auth = getAuth(firebase);

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      setUser(newUser);
    });
  }, []);

  return user;
};

export default useUser;
