// import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import { createAccount } from 'shared/utils/firebase';

const VisitorRegisterComponent = () => {
  // const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const [errors, setErrors] = useState({});
  // const [creatingAccount, setCreatingAccount] = useState(false);
  // const [image] = useState('');

  const imagePath = './icon-white.png';

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Prevents the user from submitting the form more than one time
  //   if (creatingAccount) {
  //     return;
  //   }
  //   const givenErrors = validateCredentials(username, password);
  //   setErrors(givenErrors);

  //   if (!Object.keys(givenErrors).length) {
  //     // The form is correct, so we can create the account
  //     setCreatingAccount(true);
  //     // TODO change this to use the real role instead of 'tenant'
  //     createAccount(email, password, 'owner')
  //       .then(() => {
  //         router.replace('/dashboard');
  //       })
  //       .catch(() => {
  //         setCreatingAccount(false);
  //       });
  //   }
  // };

  // const validateCredentials = (_username, _password) => {
  //   let _errors = {};

  //   if (_username === '') {
  //     _errors.username = 'This field is required';
  //   }

  //   if (_password === '') {
  //     _errors.password = 'This field is required';
  //   }

  //   return _errors;
  // };

  return (
    <div className="w-full h-screen flex">
      {/* Left side */}
      <div className="relative p-16 flex flex-col justify-between items-start w-1/2 h-screen bg-gradient-to-r from-[#02AAB0] to-[#00CDAC]">
        <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-10 z-10"></div>

        <div className="z-20">
          <img src={imagePath} alt="boatabroad-white-icon" />
        </div>

        <div className="flex flex-col grow justify-center z-20">
          <h1 className="text-6xl text-white mb-4">Welcome to Boatabroad</h1>
          <p className="text-white">
            Find the perfect boat for you and sail the world
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 h-screen p-16 flex flex-col justify-between">
        <h2 className="text-lg text-gray-900">Sign up</h2>

        <div className="grow mt-10">
          <form action="" className="space-y-6">
            <input
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              value={name}
            />

            <input
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              type="text"
              value={username}
            />

            <input
              type="email"
              placeholder="Email"
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="text"
              placeholder="Phone number"
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="phone"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />

            <input
              type="password"
              placeholder="Password"
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="border w-full h-12 rounded-3xl px-6 outline-green-400 hover:border-gray-700"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </form>
        </div>

        <div className="flex justify-end">
          <button className="rounded-3xl px-8 py-2 bg-gradient-to-r from-[#02AAB0] to-[#00CDAC] text-white cursor-pointer">
            Register
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className={style.container}>
  //     <div className={style.left}>
  //       <h1 className=" text-gray-400 text-6xl">Welcome to</h1>
  //       <h1>Boatabroad</h1>
  //       <p>
  //         Earn extra income and unlock new opportunities by sharing you boat
  //       </p>
  //     </div>
  //     <div className={style.right}>
  //       <form onSubmit={handleFormSubmit} className={style.form}>
  //         <div className={style.boxForm}>
  //           <h2 className={style.signupText}>SignUp</h2>
  //           <input
  //             name="username"
  //             type="text"
  //             className={style.input}
  //             value={username}
  //             onChange={(e) => setUserName(e.target.value)}
  //             placeholder="Name"
  //           />
  //           <input
  //             name="surname"
  //             type="text"
  //             className={style.input}
  //             value={surname}
  //             onChange={(e) => setSurname(e.target.value)}
  //             placeholder="Surname"
  //           />
  //           <input
  //             name="country"
  //             type="text"
  //             className={style.input}
  //             value={country}
  //             onChange={(e) => setCountry(e.target.value)}
  //             placeholder="country"
  //           />
  //           <input
  //             name="phoneNumber"
  //             type="text"
  //             className={style.input}
  //             value={phoneNumber}
  //             onChange={(e) => setPhoneNumber(e.target.value)}
  //             placeholder="Phone Number"
  //           />
  //           <input
  //             type="email"
  //             className={style.input}
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="Email"
  //           />
  //           <input
  //             className={style.input}
  //             name="password"
  //             type="password"
  //             value={password}
  //             onChange={(event) => setPassword(event.target.value)}
  //             placeholder="Password"
  //           />
  //           <input
  //             className={style.input}
  //             name="confirmPassword"
  //             type="password"
  //             value={confirmPassword}
  //             onChange={(event) => setConfirmPassword(event.target.value)}
  //             placeholder="Confirm Password"
  //           />
  //         </div>

  //         <button className={style.button}>Register</button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default VisitorRegisterComponent;
