// app/components/navbar.jsx
"use client"; // Allows client-side interactivity

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the role from localStorage or other secure storage
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    router.push('/login'); // Redirect to login page on logout
  };

  return (
    <nav className=" p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>

        {role === 'admin' && (
          <Link href="/admin" className="text-white hover:text-gray-300">
            Admin Dashboard
          </Link>
        )}

        {role === 'user' && (
          <Link href="/user" className="text-white hover:text-gray-300">
            User Dashboard
          </Link>
        )}

        {!role && (
          <Link href="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        )}
      </div>

      {role && (
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}



