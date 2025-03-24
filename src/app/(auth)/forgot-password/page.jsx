'use client';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h2 className='text-xl font-semibold mb-4'>Forgot Password?</h2>
      <form
        onSubmit={handleSubmit}
        className='w-80 bg-white p-4 rounded-lg shadow-md'
      >
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='w-full px-3 py-2 border rounded mb-3'
        />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded'
        >
          Send Reset Link
        </button>
        {message && (
          <p className='mt-3 text-center text-sm text-gray-600'>{message}</p>
        )}
      </form>
    </div>
  );
}
