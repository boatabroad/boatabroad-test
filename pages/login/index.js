import React, { useState } from 'react';
import Link from 'next/link';
import style from './style.module.scss';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from 'shared/utils/firebase';
import { logIn } from 'shared/utils/firebase/logIn';
import { useRouter } from 'next/router';
import GoogleButton from 'components/googleButton';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    logIn(email, password).then(() => {
      router.push('/dashboard');
    });
  };

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
    <div className={style.container}>
      <div className={style.boxForm}>
        <h1 className={style.h1Text}>Welcome to BoataBroad</h1>
        <form onSubmit={handleFormSubmit} className={style.form}>
          <div className={style.mid}>
            <input
              type="email"
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              className={style.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className={style.button}>Login</button>
            <div className={style.h4Text}>
              <hr />
              <h4>or</h4>
              <hr />
            </div>

            <GoogleButton onclick={googleLogin} />
          </div>
          <div className={style.bottom}>
            <Link href="/register">
              <button>You Don't have Account?</button>
            </Link>
            <Link href="#">
              <button>I forget my Pass</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
