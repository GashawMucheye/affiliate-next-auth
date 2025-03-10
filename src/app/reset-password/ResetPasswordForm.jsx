'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setSuccess('Password updated successfully!');
        setTimeout(() => router.push('/login'), 2000);
      }
    } catch (error) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg'>
      <h2 className='text-2xl font-semibold text-center mb-4'>
        Reset Password
      </h2>

      {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}
      {success && <p className='text-green-500 text-sm mb-3'>{success}</p>}

      <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
        <input
          type='password'
          placeholder='New Password'
          className='p-2 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='p-2 border rounded'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type='submit'
          className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
