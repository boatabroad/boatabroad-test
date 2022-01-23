import React, { useState } from 'react';
import Link from 'next/link';
import { logIn } from 'shared/utils/firebase/logIn';
import { useRouter } from 'next/router';

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
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Login en BoataBroad 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                'w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
              }
              id="email"
              placeholder="Example@something.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                'w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4'
              }
              id="password"
              placeholder="* * * * * *"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button className="bg-green py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark w-full">
              Login
            </button>
          </div>

          <div className="flex justify-center items-center mt-6">
            <Link href="/register">
              <button className="bg-green py-2 px-4 text-sm text-black">
                {"Don't have an account?"}
              </button>
            </Link>

            <Link href="#">
              <button className="bg-green py-2 px-4 text-sm text-black">
                I forgot my password
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
