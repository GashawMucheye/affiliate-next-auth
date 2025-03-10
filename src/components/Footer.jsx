'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setEmail('');
  };

  return (
    <footer className='bg-gray-900 text-white py-10 mt-10'>
      <div className='container mx-auto px-6 flex flex-col md:flex-row justify-between items-center'>
        <div className='mb-6 md:mb-0'>
          <h2 className='text-2xl font-bold'>Stay Updated</h2>
          <p className='text-gray-400'>
            Subscribe to get the latest Amazon deals & hottest products.
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className='flex flex-col md:flex-row gap-2'
        >
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='p-2 w-full md:w-64 rounded-md text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500'
          />
          <button
            type='submit'
            className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-black font-semibold'
          >
            Subscribe
          </button>
        </form>

        {message && <p className='mt-2 text-sm text-yellow-400'>{message}</p>}
      </div>

      <div className='border-t border-gray-700 mt-8 pt-6 text-center text-gray-400'>
        <p>
          &copy; {new Date().getFullYear()} Affiliate Website. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
