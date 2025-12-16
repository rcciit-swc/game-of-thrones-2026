'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { logout } from '@/utils/functions/auth/logout';
import { login } from '@/utils/functions/auth/login';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    email?: string;
  };
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user as User);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-gray-500">
        No user logged in{' '}
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-950 rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-white">User ID:</p>
          <p className="font-mono text-sm break-all">{user.id}</p>
        </div>
        <div>
          <p className="text-sm text-white">Email:</p>
          <p className="font-semibold">
            {user.email || user.user_metadata?.email || 'N/A'}
          </p>
        </div>
        {user.user_metadata?.name && (
          <div>
            <p className="text-sm text-white">Name:</p>
            <p className="font-semibold">{user.user_metadata.name}</p>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
