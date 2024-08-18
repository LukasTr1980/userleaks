import type { Metadata, Viewport } from 'next';
import './globals.css';
import Sidebar from './components/Sidebar';
import NavLinks from './components/Navlinks';
import logoSmallImage from './image/logo-43x48.webp';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Userleaks',
  description: 'Tracking users',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[auto_1fr] h-screen min-w-full relative">
          <div className="w-full h-16 flex items-center justify-center relative border-b border-gray-300">
            <Sidebar />
            <Image
              src={logoSmallImage}
              alt='Userleaks logo'
              className='hidden sm:block left-4 absolute'
              width={43}
              height={48}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
            {/* Sidebar */}
            <div className="hidden sm:block border-r border-gray-300 pt-4">
              <NavLinks />
            </div>
            <div className="bg-white max-w-7xl sm:px-4 pt-4">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
