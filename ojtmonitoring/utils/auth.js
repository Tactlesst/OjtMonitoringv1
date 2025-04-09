import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios'; 

const TOKEN_KEY = 'token';
const TOKEN_EXPIRY_MINUTES = 10;

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Store authentication token with rememberMe option
export const storeAuthToken = (token, remember = false) => {
  const now = new Date();
  const expires = new Date(now.getTime() + TOKEN_EXPIRY_MINUTES * 60 * 1000); // 10 min expiry

  const options = {
    path: '/',
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
    expires: remember ? 7 : expires // 7 days if "remember me", else 10 mins
  };

  Cookies.set(TOKEN_KEY, token, options);
  Cookies.set(`${TOKEN_KEY}_issuedAt`, now.toISOString(), options); // track timestamp
};

// Clear authentication token 
export const clearAuthToken = () => {
  Cookies.remove(TOKEN_KEY, { path: '/' });
  Cookies.remove(`${TOKEN_KEY}_issuedAt`, { path: '/' });
};
// Check if token is still valid based on time
export const isAuthenticated = () => {
  const token = Cookies.get(TOKEN_KEY);
  const issuedAt = Cookies.get(`${TOKEN_KEY}_issuedAt`);

  if (!token || !issuedAt) return false;

  const issuedTime = new Date(issuedAt).getTime();
  const now = new Date().getTime();
  const elapsedMinutes = (now - issuedTime) / (1000 * 60);

  if (elapsedMinutes > TOKEN_EXPIRY_MINUTES) {
    clearAuthToken();
    return false;
  }

  return true;
};

// Decode and get current user
export const getCurrentUser = () => {
  const token = Cookies.get(TOKEN_KEY);

  if (!token) return null;

  try {
    const decoded = jwt.decode(token);

    // Optionally, validate expiration from token directly
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      clearAuthToken(); // Token expired
      return null;
    }

    return {
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
      firstName: decoded.firstName, // Add first name here
      lastName: decoded.lastName,   // Add last name here
      issuedAt: decoded.iat ? new Date(decoded.iat * 1000) : null,
      expiresAt: decoded.exp ? new Date(decoded.exp * 1000) : null,
      _raw: decoded,
    };
  } catch (error) {
    console.error('Token decode error:', error);
    clearAuthToken();
    return null;
  }
};

export const logout = () => {
  // Remove token from cookies
  Cookies.remove('token'); // Ensure 'token' matches your actual cookie key

  // Optionally clear other data from localStorage
  localStorage.removeItem('selectedPage');
  localStorage.removeItem('currentUser');

  // Redirect to login page
  const router = useRouter();
  router.push('/auth');
};

// Logout user and redirect
export const logoutUser = () => {
  clearAuthToken();
  window.location.href = '/auth';
};

// Redirect by user role
export const redirectByRole = (router, user = null) => {
  const currentUser = user || getCurrentUser();
  if (!currentUser) return router.push('/auth');

  const role = currentUser.role || currentUser.userType; // fallback if needed
  const targetPath = `/${role}`; // assumes pages like /admin/index.js, /student/index.js, etc.

  return router.push(targetPath);
};
