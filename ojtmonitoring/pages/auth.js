import { useState } from 'react';
import LoginForm from '../pages/login';
import Link from 'next/link';
import Image from 'next/image';

export default function Auth() {
  // No need for activeTab state if there's only login
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/Images/Crim_GroupPicture.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content container */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">SRCB BSCRIM</h1>
          <p className="text-gray-600">Online Interactive QJT monitoring</p>
        </div>

        {/* Login Form */}
        <div className="mb-4">
          <LoginForm />
        </div>

        {/* Footer Links */}
        <Link href="/" className="mt-4 text-gray-500 hover:text-gray-700 text-sm block text-center">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}
