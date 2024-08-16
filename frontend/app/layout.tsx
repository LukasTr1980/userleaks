import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UserLeaks',
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
        <ul>
          <a href="/">
            <li>
              Home
            </li>
          </a>
          <a href="ipaddress">
            <li>
              IP Address
            </li>
          </a>
          <a href="canvas">
            <li>
              Canvas
            </li>
          </a>
          <a href="#">
            <li>
              Tab
            </li>
          </a>
        </ul>
        <div className='container w-screen md:ml-3 bg-white p-2'>
          {children}
        </div>
      </body>
    </html>
  );
}
