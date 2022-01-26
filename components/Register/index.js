import { useState } from 'react';
import { auth, createAccount, provider } from 'shared/utils/firebase';
import { useRouter } from 'next/router';
import style from './style.module.scss';
import Image from 'next/image';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [image, setImage] = useState('');

  console.log(errors);
  console.log(image);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
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
      createAccount(username, password, 'tenant')
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

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  console.log(handleFileChange);

  return (
    // <div className="h-screen flex bg-gray-bg1">
    //   <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
    //     <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
    //       Registrarse en BoataBroad 🔐
    //     </h1>

    //     <form onSubmit={handleLoginForm.bind(this)}>
    //       <div>
    //         <label htmlFor="email">Correo</label>
    //         <input
    //           id="username"
    //           className={
    //             'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' +
    //             (errors.username ? 'border-red-500' : '')
    //           }
    //           name="username"
    //           type="text"
    //           placeholder="Example@something.com"
    //           value={username}
    //           onChange={(event) => setUsername(event.target.value)}
    //           autoComplete="off"
    //         />
    //         {errors.username && (
    //           <p className="text-red-500 text-xs italic">{errors.username}</p>
    //         )}
    //       </div>
    //       <div>
    //         <label htmlFor="password">Contraseña</label>
    //         <input
    //           id="password"
    //           className={
    //             'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' +
    //             (errors.password ? 'border-red-500' : '')
    //           }
    //           name="password"
    //           type="password"
    //           placeholder="* * * * * * * *"
    //           value={password}
    //           onChange={(event) => setPassword(event.target.value)}
    //         />
    //         {errors.password && (
    //           <p className="text-red-500 text-xs italic">{errors.password}</p>
    //         )}
    //       </div>

    //       <div className="flex justify-center items-center mt-6">
    //         <button
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-none"
    //           disabled={creatingAccount}
    //         >
    //           {creatingAccount ? 'Alla vamos..' : 'Registrarme'}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className={style.container}>
      <h1 className={style.h1Text}>Welcome to BoataBroad</h1>

      <form onSubmit={handleFormSubmit} className={style.form}>
        <div className={style.mid}>
          <div className={style.boxForm}>
            <pre className={style.miniPre}>User Name</pre>
            <input
              name="username"
              type="text"
              className={style.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <pre className={style.miniPre}>Email</pre>
            <input
              type="email"
              className={style.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="Example@something.com"
            />
            <pre className={style.miniPre}>Password</pre>
            <input
              className={style.input}
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div
            className={style.cameraPick}
            id="fileSelector"
            name="file"
            onClick={handlePictureClick}
          >
            <Image
              src={'/images/camera.png'}
              // layout="fill"
              width={50}
              height={50}
            />
            {/* <input className={style.cameraPick}
              id="fileSelector"
              type="file"
              name="file"
              style={{ outline: 'none', display: "none" }}
              onClick={handlePictureClick}
            /> */}
          </div>
        </div>

        <button className={style.button}>Register</button>
        <h4 className={style.h4Text}>Or</h4>
        <div className={style.googleLogin} onClick={googleLogin}>
          <img
            className={style.googleIcon}
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google button"
          />
          <p className={style.googleText}>Continue with Google</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
