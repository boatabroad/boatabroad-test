import { useState } from 'react';
import { createAccount } from 'utils/firebase';
import { useRouter } from 'next/router';
const RegisterComponent = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleLoginForm = (evt) => {
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
      createAccount(username, password)
        .then((user) => {
          localStorage.setItem('userAccessToken', user.accessToken);
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

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Registrarse en BoataBroad 🔐
        </h1>

        <form onSubmit={handleLoginForm.bind(this)}>
          <div>
            <label htmlFor="email">Correo</label>
            <input
              id="username"
              className={
                'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' +
                (errors.username ? 'border-red-500' : '')
              }
              name="username"
              type="text"
              placeholder="Example@something.com"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              className={
                'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' +
                (errors.password ? 'border-red-500' : '')
              }
              name="password"
              type="password"
              placeholder="* * * * * * * *"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-none"
              disabled={creatingAccount}
            >
              {creatingAccount ? 'Alla vamos..' : 'Registrarme'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
