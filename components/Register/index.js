import { useState } from 'react';
import { createAccount } from 'shared/utils/firebase';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import Image from 'next/image';
import GoogleButton from 'components/googleButton';

const Register = () => {
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

  const validateCredentials = (username, password) => {
    let errors = {};

    if (username === '') {
      errors.username = 'This field is required';
    }

    if (password === '') {
      errors.password = 'This field is required';
    }

    return errors;
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

  return (
    <div className={style.container}>
      <div className={style.right}>
        {/* <H1 color="#00bfc1" text="Create Account" /> */}
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
            <div className={style.boxForm}>
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
            <div className={style.cameraPick}>
              <Image src={'/images/camera.png'} width={50} height={50} />
            </div>
          </div>

          <button className={style.button}>Register</button>
          <h4 className={style.h4Text}>or</h4>
          <GoogleButton />
        </form>
      </div>
    </div>
  );
};

export default Register;
