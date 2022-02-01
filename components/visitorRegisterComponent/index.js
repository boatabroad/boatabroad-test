import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { createAccount } from 'shared/utils/firebase';
import style from './style.module.scss';

const VisitorRegisterComponent = () => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [surname, setSurname] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [image] = useState('');

  console.log(errors);
  console.log(image);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Prevents the user from submitting the form more than one time
    if (creatingAccount) {
      return;
    }
    const givenErrors = validateCredentials(username, password);
    setErrors(givenErrors);

    if (!Object.keys(givenErrors).length) {
      // The form is correct, so we can create the account
      setCreatingAccount(true);
      // TODO change this to use the real role instead of 'tenant'
      createAccount(email, password, 'tenant')
        .then(() => {
          router.replace('/dashboard');
        })
        .catch(() => {
          setCreatingAccount(false);
        });
    }
  };

  const validateCredentials = (_username, _password) => {
    let _errors = {};

    if (_username === '') {
      _errors.username = 'This field is required';
    }

    if (_username === '') {
      _errors.password = 'This field is required';
    }

    return _errors;
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  return (
    <div className={style.container}>
      <div className={style.left}>
        <h1>Welcome to</h1>
        <h1>Boatabroad</h1>
        <p>Find the perfect boat for you and sail the world</p>
      </div>
      <div className={style.right}>
        <form onSubmit={handleFormSubmit} className={style.form}>
          <div className={style.boxForm}>
            <h2 className={style.signupText}>SignUp</h2>
            <input
              name="username"
              type="text"
              className={style.input}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Name"
            />
            <input
              name="surname"
              type="text"
              className={style.input}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Surname"
            />
            <input
              name="country"
              type="text"
              className={style.input}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="country"
            />
            <input
              name="phoneNumber"
              type="text"
              className={style.input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <input
              type="email"
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              className={style.input}
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
            <input
              className={style.input}
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm Password"
            />
          </div>

          <button className={style.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default VisitorRegisterComponent;
