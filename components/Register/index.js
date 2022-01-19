import { useState } from 'react';
import { createAccount } from 'utils/firebase';

const RegisterComponent = () => {
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
      createAccount(username, password).finally(() => {
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
    <form
      className="flex flex-wrap w-full"
      onSubmit={handleLoginForm.bind(this)}
    >
      <section className="pl-6 pr-3 w-1/2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
        </label>
        <input
          id="username"
          className={
            'border mb-2 py-2 px-3 rounded text-gray-700 w-full focus:bg-primary ' +
            (errors.username ? 'border-red-500' : '')
          }
          name="username"
          type="text"
          placeholder="e.g. some.example"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">{errors.username}</p>
        )}
      </section>
      <section className="pl-3 pr-6 w-1/2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
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
      </section>
      <section className="flex justify-end px-6 mt-3 w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:border-none"
          disabled={creatingAccount}
        >
          {creatingAccount ? 'Signing up...' : 'Sign up'}
        </button>
      </section>
    </form>
  );
};

export default RegisterComponent;
