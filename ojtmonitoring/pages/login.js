import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';
import { storeAuthToken, getCurrentUser, redirectByRole } from '../utils/auth';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      redirectByRole(router, user);
    }
  }, [router]);

  // Input handler
  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Both email and password are required.',
        confirmButtonColor: '#d33',
      });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#d33',
      });
      return false;
    }

    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // Store token in cookies
        storeAuthToken(data.token);

        // Decode token to get role
        const decoded = jwt.decode(data.token);

        Swal.fire({
          icon: 'success',
          title: 'Welcome Back!',
          text: 'You have successfully logged in.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Redirect based on role
        await redirectByRole(router, decoded);
      } else {
        throw new Error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Log in</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
