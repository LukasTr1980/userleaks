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
        <div className="grid grid-rows-[auto_1fr] h-screen min-w-full">
          <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
            Test
          </div>
          <div className="grid grid-cols-[250px_1fr]">
            {/* Sidebar */}
            <ul className="w-64 p-4">
              <a href="/">
                <li>Home</li>
              </a>
              <a href="ipaddress">
                <li>IP Address</li>
              </a>
              <a href="canvas">
                <li>Canvas</li>
              </a>
              <a href="#">
                <li>Tab</li>
              </a>
            </ul>
            <div className="bg-white p-4">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
