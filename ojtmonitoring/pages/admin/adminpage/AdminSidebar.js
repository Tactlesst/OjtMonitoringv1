// components/admin/AdminSidebar.js
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { logoutUser } from '@/utils/auth';

export default function AdminSidebar({ selectedPage, onPageChange, user }) {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser(); // Handles session clearing

        Cookies.remove('authToken');
        Cookies.remove('adminData');
        localStorage.removeItem('adminSelectedPage');

        router.push('/auth');
    };

    return (
        <div className="w-64 bg-blue-800 shadow-md h-screen flex flex-col justify-between text-white">
            {/* Admin Info */}
            <div className="p-4 border-b border-blue-700">
                <h1 className="text-xl font-bold">
                    {user?.firstName} {user?.lastName || ''}
                </h1>
                <p className="text-sm text-blue-300">
                    {user?.email || 'admin@example.com'}
                </p>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                <button
                    onClick={() => onPageChange('dashboard')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 ${selectedPage === 'dashboard' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v9a2 2 0 01-2 2h-4v-5H7v5H3a2 2 0 01-2-2V9z"/>
                    </svg>
                    Dashboard
                </button>
                <button
                    onClick={() => onPageChange('coordinator')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 ${selectedPage === 'coordinator' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h3l4 4m0 0l-4 4m4-4H9M7 12H4l-4-4m0 0l4-4m-4 4h3"/>
                    </svg>
                    Coordinator
                </button>
                <button
                    onClick={() => onPageChange('students')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 ${selectedPage === 'students' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v9m0 0l3-3m-3 3l-3-3m3 3v9m0 0H9m3 0h3m-3 0v-9m0 0L9 9m3 3l3-3"/>
                    </svg>
                    Students
                </button>
                <button
                    onClick={() => onPageChange('organization')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 ${selectedPage === 'organization' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                    Organization
                </button>
                <button
                    onClick={() => onPageChange('archive')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 ${selectedPage === 'archive' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11h2a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2v-7a2 2 0 012-2h2m0 0V6a2 2 0 012-2h10a2 2 0 012 2v5"/>
                    </svg>
                    Archive
                </button>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-blue-700">
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md text-red-400 flex items-center hover:bg-blue-700"
                >
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H9m3 0H4m3 0v9"/>
                    </svg>
                    Log out
                </button>
            </div>
        </div>
    );
}
