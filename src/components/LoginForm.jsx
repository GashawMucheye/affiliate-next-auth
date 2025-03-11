'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (error) {
      setError(data.error);
    } else {
      window.location.href = '/dashboard';
    }
  };
  // bg-gray-100 px-4

  return (
    <div className='flex min-h-screen items-center justify-center  bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          {/* Email Input */}
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200'
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200'
            />
          </div>

          {/* Error Message */}
          {error && <p className='text-sm text-red-500'>{error}</p>}

          {/* Login Button */}
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer'
          >
            Login
          </button>
        </form>

        {/* Forgot Password & Register */}
        <div className='mt-4 text-center text-sm text-gray-600'>
          <a href='/forgot-password' className='text-blue-600 hover:underline'>
            Forgot password?
          </a>
        </div>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <a href='/register' className='text-blue-600 hover:underline'>
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
