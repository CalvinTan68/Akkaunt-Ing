import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { useEffect, useState } from 'react';

export default function Guest({ children }) {
    const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>

            <div className="mt-4">
                {path == '/login' ?
                <Link href={route('register')} className="btn btn-outline btn-sm text-sm border-none text-white text-white hover:border-none text-center bg-rose-500 hover:bg-rose-700">
                    I don't have an account
                </Link>
                : path == '/register' ?
                <Link href={route('login')} className="btn btn-outline btn-sm text-sm border-none text-white text-white hover:border-none text-center bg-emerald-500 hover:bg-emerald-700">
                    I already have an account
                </Link>
                :
                <Link href={route('login')} className="btn btn-outline btn-sm text-sm border-none text-white hover:text-white text-center">
                    Take me back to login page
                </Link>
                }
            </div>
        </div>
    );
}
