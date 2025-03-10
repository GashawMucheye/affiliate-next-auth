'use client';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className='rounded-lg bg-red-600 px-4 py-2 text-white transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 disabled:bg-gray-400'
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
