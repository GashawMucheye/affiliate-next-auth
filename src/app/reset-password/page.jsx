// 'use client';
// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function ResetPassword() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get('token');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     const res = await fetch('/api/auth/reset-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ token, newPassword }),
//     });

//     const data = await res.json();
//     setMessage(data.message || data.error);
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
//       <h2 className='text-xl font-semibold mb-4'>Reset Password</h2>
//       <form
//         onSubmit={handleSubmit}
//         className='w-80 bg-white p-4 rounded-lg shadow-md'
//       >
//         <input
//           type='password'
//           placeholder='Enter new password'
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           className='w-full px-3 py-2 border rounded mb-3'
//         />
//         <button
//           type='submit'
//           className='w-full bg-green-500 text-white py-2 rounded'
//         >
//           Reset Password
//         </button>
//         {message && (
//           <p className='mt-3 text-center text-sm text-gray-600'>{message}</p>
//         )}
//       </form>
//     </div>
//   );
// }
'use client';
import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
