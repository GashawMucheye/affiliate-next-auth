'use client';
import Navbar from '@/components/Navbar';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({ children }) {
  return (
    <html data-theme='dark'>
      <body>
        <SessionProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex-grow'>{children}</div>
            <Footer />
          </div>
          <ToastContainer />
        </SessionProvider>
        ;
      </body>
    </html>
  );
}
