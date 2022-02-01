import React, { useState } from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import { logIn } from 'shared/utils/firebase/logIn';
import { useRouter } from 'next/router';
import GoogleButton from 'components/googleButton';
import Image from 'next/image';

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

  return (
    <div className={style.container}>
      <div className={style.boxForm}>
        <div className={style.welcomeBox}>
          <Image
            src="/images/logoColor.png"
            alt="Company Logo"
            width={40}
            height={40}
          />
          <h1 className={style.h1Text}>Welcome to BoataBroad</h1>
        </div>

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

            <GoogleButton />
          </div>
          <div className={style.bottom}>
            <Link href="/ownerOrVisitor">
              <button className={style.hover}>You Don't have Account?</button>
            </Link>
            <Link href="#">
              <button className={style.hover}>I forget my Pass</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
