'use client';
import Navbar from '@/components/Navbar';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          <div className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex-grow'>{children}</div>
            <Footer />
          </div>
        </SessionProvider>
        ;
      </body>
    </html>
  );
}
