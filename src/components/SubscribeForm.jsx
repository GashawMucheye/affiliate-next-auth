import React from 'react';

const SubscribeForm = ({ email, setEmail, handleSubscribe, message }) => {
  return (
    <div>
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
  );
};

export default SubscribeForm;
