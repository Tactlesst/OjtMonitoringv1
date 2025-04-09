// components/StudentSidebar.js
import { useRouter } from 'next/router';
import { logoutUser } from '@/utils/auth';
import Image from 'next/image';
import logo from '../../../public/Crim_Logo.jpg'; // Replace with your actual logo path

export default function StudentSidebar({ selectedPage, onPageChange }) {
  const router = useRouter();

  // Example user data (for demonstration purposes)
  const exampleUser = {
    name: 'User Name',
    traineeId: '1234567',
  };

  return (
    <div className="w-64 bg-blue-700 shadow-md flex flex-col justify-between h-screen text-white">
      <div>
        <div className="p-4 border-b border-blue-600 flex flex-col items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-2">
            <Image src={logo} alt="School Logo" layout="fill" objectFit="cover" />
          </div>
          <h1 className="text-lg font-bold text-center">SRCB BSCRIM</h1>
          <p className="text-sm text-blue-200 text-center">Student Portal</p>
          {/* Conditionally render either example data or data from localStorage */}
          {typeof window !== 'undefined' && localStorage.getItem('currentUser') ? (
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold">{JSON.parse(localStorage.getItem('currentUser'))?.name || 'Guest'}</p>
              <p className="text-xs text-blue-300">
                Trainee ID: {JSON.parse(localStorage.getItem('currentUser'))?.traineeId || 'N/A'}
              </p>
            </div>
          ) : (
            <div className="mt-2 text-center">
              <p className="text-sm font-semibold">{exampleUser.name}</p>
              <p className="text-xs text-blue-300">Trainee ID: {exampleUser.traineeId}</p>
            </div>
          )}
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => onPageChange('home')}
            className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 ${
              selectedPage === 'home' ? 'bg-blue-600' : ''
            } flex items-center`}
          >
            <svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l6-6"/></svg>
            Dashboard
          </button>
          <button
            onClick={() => onPageChange('attendance')}
            className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 ${
              selectedPage === 'attendance' ? 'bg-blue-600' : ''
            } flex items-center`}
          >
            <svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            Attendance
          </button>
          <button
            onClick={() => onPageChange('guidelines')}
            className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 ${
              selectedPage === 'guidelines' ? 'bg-blue-600' : ''
            } flex items-center`}
          >
            <svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2-2H9m2-2h.01M3 21v-2a2 2 0 012-2h14a2 2 0 012 2v2m-6-3h.01M12 7h.01M15 11h.01M6 7h.01M3 4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"/></svg>
            Guidelines
          </button>
          <button
            onClick={() => onPageChange('logs')}
            className={`w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 ${
              selectedPage === 'logs' ? 'bg-blue-600' : ''
            } flex items-center`}
          >
            <svg className="w-5 h-5 mr-2 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"/></svg>
            Logs
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-blue-600">
        <button
          onClick={logoutUser}
          className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-600 text-red-400 flex items-center"
        >
          <svg className="w-5 h-5 mr-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-3a2 2 0 012-2H5a2 2 0 012 2v3m4-4h.01"/></svg>
          Log out
        </button>
      </div>
    </div>
  );
}