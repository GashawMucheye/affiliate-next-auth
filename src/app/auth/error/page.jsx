'use client';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold text-red-600'>Authentication Error</h1>
      <p className='text-gray-600 mt-2'>{error || 'Something went wrong.'}</p>
      <a href='/login' className='text-blue-500 mt-4'>
        Back to Login
      </a>
    </div>
  );
}
