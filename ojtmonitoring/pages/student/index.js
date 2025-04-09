// components/StudentDashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/utils/auth'; // Ensure this function fetches current user data
import StudentSidebar from '../student/studentpage/StudentSidebar';
import HomePage from '../student/studentpage/HomePage';
import AttendancePage from '../student/studentpage/AttendancePage';
import GuidelinesPage from '../student/studentpage/GuidelinesPage';
import Logs from '../student/studentpage/logs';
export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = getCurrentUser();
      if (!userData || userData.role !== 'student') {
        router.replace('/auth');
      } else {
        setUser(userData);
        const savedPage = localStorage.getItem('selectedPage');
        if (savedPage) setSelectedPage(savedPage);
      }
    }
  }, [router]);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    localStorage.setItem('selectedPage', page);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar selectedPage={selectedPage} onPageChange={handlePageChange} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {selectedPage === 'home' && <HomePage user={user} />}
          {selectedPage === 'attendance' && <AttendancePage user={user} />}
          {selectedPage === 'guidelines' && <GuidelinesPage user={user} />}
          {selectedPage === 'logs' && <Logs user={user} />}
        </div>
      </div>
    </div>
  );
}
