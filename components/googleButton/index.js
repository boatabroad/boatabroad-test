import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from 'shared/utils/firebase';
import style from './style.module.scss';
import { useRouter } from 'next/router';

const GoogleButton = () => {
  const router = useRouter();

  const googleLogin = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);

        const token = credential.accessToken;
        console.log(token);

        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });

        if (!user) {
          return;
        }

        console.log(user);
        router.replace({
          pathname: '/dashboard',
        });
      })

      .catch((error) => {
        console.log(error);

        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);

        const errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorMessage);

        const email = error.email;
        console.log(email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
      });
  };
  return (
    <div className={style.googleLogin} onClick={googleLogin}>
      <img
        className={style.googleIcon}
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="google button"
      />
      <p className={style.googleText}>Continue with Google</p>
    </div>
  );
};

export default GoogleButton;
