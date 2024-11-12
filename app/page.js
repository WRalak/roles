'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role'); // Replace with secure data fetching

    if (userRole !== 'user') {
      router.push('/login'); // Redirect to login if not a user
    }
  }, [router]);

  return <div>Welcome to the User Page</div>;
}