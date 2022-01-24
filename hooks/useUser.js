import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import firebase from 'shared/utils/firebase';

const auth = getAuth();

const useUser = () => {
  const [data, setData] = useState({ loading: true, user: null, role: null });
  const { loading, user, role } = data;

  useEffect(() => {
    onAuthStateChanged(auth, (givenUser) => {
      const newData = { loading: false, user: givenUser };

      if (givenUser) {
        givenUser.getIdTokenResult().then((idTokenResult) => {
          setData({
            ...newData,
            role: idTokenResult.claims.role,
          });
        });
      } else {
        setData(newData);
      }
    });
  }, []);

  return { loading, user, role };
};

export default useUser;
