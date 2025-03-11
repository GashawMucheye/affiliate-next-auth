'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Affiliate Gashaw
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6 items-center'>
          <Link
            href='/'
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            Home
          </Link>
          <Link
            href='/dashboard'
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            Dashboard
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {session?.user ? (
            <div className='flex items-center space-x-4'>
              <span className='text-gray-900 dark:text-gray-300 font-medium'>
                {session.user.name}
              </span>
              {/* <button
                onClick={() => signOut()}
                className='bg-red-500 text-white px-4 py-2 rounded-md'
              >
                Logout
              </button> */}
              <LogoutButton />
            </div>
          ) : (
            <Link
              href='/login'
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={28} className='text-gray-700 dark:text-gray-300' />
          ) : (
            <Menu size={28} className='text-gray-700 dark:text-gray-300' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden bg-white dark:bg-gray-800 shadow-md'>
          <Link
            href='/'
            onClick={() => setMenuOpen(!menuOpen)}
            className='block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            Home
          </Link>
          <Link
            href='/dashboard'
            onClick={() => setMenuOpen(!menuOpen)}
            className='block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            Dashboard
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='block w-full text-left px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {session?.user ? (
            <>
              <span className='block px-6 py-3 text-gray-900 dark:text-gray-300'>
                {session.user.name}
              </span>
              <button
                onClick={() => signOut()}
                className='block w-full text-left px-6 py-3 bg-red-500 text-white'
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href='/login'
              onClick={() => setMenuOpen(!menuOpen)}
              className='block px-6 py-3 bg-blue-500 text-white text-center'
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
