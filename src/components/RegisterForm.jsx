'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      setError('User already exists or invalid input');
      return;
    }

    router.push('/login');
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-700'>
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className='space-y-4'>
          {/* Name Input */}
          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200'
            />
          </div>

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

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300'
          >
            Register
          </button>
        </form>

        {/* Redirect to Login */}
        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <a href='/login' className='text-blue-600 hover:underline'>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
