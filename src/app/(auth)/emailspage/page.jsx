'use client';

import React, { useEffect, useState } from 'react';

const EmailListPage = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/subscribe');
        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }
        const data = await response.json();
        setEmails(data.emails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen text-red-500'>
        Error: {error}
      </div>
    );
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Email List</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {emails.map((email) => (
          <div
            key={email._id}
            className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <h2 className='text-lg font-semibold text-gray-800'>
              {email.email}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailListPage;
