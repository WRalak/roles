'use client'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role) => {
    localStorage.setItem('role', role); // Replace this with secure session handling as needed
    router.push(role === 'admin' ? '/admin' : '/user'); // Navigate based on the role
  };

  return (
    <div className=' p-4 '>
      <h1 className='font-bold'>Login Page</h1>
      <button onClick={() => handleLogin('admin')} className='mr-3 bg-green-500'>Login as Admin</button>
      <button onClick={() => handleLogin('user')} className='bg-yellow-300'>Login as User</button>
    </div>
  );
}
