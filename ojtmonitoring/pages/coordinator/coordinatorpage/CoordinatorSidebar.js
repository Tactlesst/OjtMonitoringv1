import { useRouter } from 'next/router';
import { logoutUser } from '@/utils/auth';

export default function CoordinatorSidebar({ selectedPage, onPageChange, user }) {
    const router = useRouter();

    const handleLogout = () => {
        // Implement your coordinator logout logic here
        console.log('Coordinator logging out');
        router.push('/auth'); // Redirect to the authentication page
    };

    return (
        <div className="w-64 bg-blue-800 shadow-md h-screen flex flex-col justify-between text-white">
            <div className="p-4 border-b border-blue-700">
                <h1 className="text-xl font-bold">{user?.name || 'Coordinator Name'}</h1>
                <p className="text-sm text-blue-300">OJT Coordinator</p>
            </div>

            <nav className="p-4 space-y-2">
                <button
                    onClick={() => onPageChange('dashboard')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300 ${selectedPage === 'dashboard' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l6-6"/></svg>
                    Dashboard
                </button>
                <button
                    onClick={() => onPageChange('students')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300 ${selectedPage === 'students' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354l-2 2m0 0l-2-2m2 2v14.728a2 2 0 002 2.002h0a2 2 0 002-2.002V6.354l-2-2m2 2l2 2m-2-2l-2-2"/></svg>
                    Students
                </button>
                <button
                    onClick={() => onPageChange('reports')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300 ${selectedPage === 'reports' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-2m3-4v-6m-3 2h6m-6 4h6m-6 6h6"/></svg>
                    Reports
                </button>
                <button
                    onClick={() => onPageChange('archive')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300 ${selectedPage === 'archive' ? 'bg-blue-700' : ''}`}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                    Archive
                </button>
            </nav>

            <div className="p-4 border-t border-blue-700">
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
