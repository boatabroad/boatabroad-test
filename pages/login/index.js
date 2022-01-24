import React from 'react';
import Link from 'next/link';
import style from './style.module.css';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from 'shared/utils/firebase';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    console.log(email, password);
  };

  const googleLogin = async () => {
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });

        if (!user) {
          return;
        }
        console.log(user);
        router.push({
          pathname: '/dashboard',
        });
      })

      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className={style.container}>
      <div className={style.boxForm}>
        <h1 className={style.h1Text}>Welcome to BoataBroad</h1>
        <form onSubmit={handleFormSubmit} className={style.form}>
          <div className={style.mid}>
            <pre className={style.miniPre}>Email</pre>
            <input
              type="email"
              className={style.input}
              id="email"
              placeholder="Example@something.com"
            />
            <pre className={style.miniPre}>Password</pre>
            <input
              type="password"
              className={style.input}
              id="password"
              placeholder="* * * * * *"
            />
            <button className={style.button}>Login</button>
            <h4 className={style.h4Text}>Or</h4>
            <div className={style.googleLogin} onClick={googleLogin}>
              <img
                className={style.googleIcon}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
              <p className={style.googleText}>Continue with Google</p>
            </div>
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
