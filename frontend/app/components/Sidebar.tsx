'use client';

import { useState } from 'react';
import NavLinks from './Navlinks';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="sm:hidden absolute left-4 top-1/2 transform -translate-y-1/2"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 sm:hidden'
          onClick={closeSidebar}
        />
      )}

      <div
        className={`pt-4 border-r border-gray-300 bg-white fixed top-0 left-0 h-full w-52 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 sm:hidden`}
      >
        <NavLinks closeSidebar={closeSidebar} />
      </div>
    </>
  );
}
