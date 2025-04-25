// components/StudentDashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/utils/auth'; // Your existing getCurrentUser function
import axios from 'axios'; // Import axios
import StudentSidebar from '../student/studentpage/StudentSidebar';
import HomePage from '../student/studentpage/HomePage';
import AttendancePage from '../student/studentpage/AttendancePage';
import GuidelinesPage from '../student/studentpage/GuidelinesPage';
import Logs from '../student/studentpage/logs';

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState('home');
  const [studentData, setStudentData] = useState(null); // To store fetched student data

  useEffect(() => {
    const userData = getCurrentUser(); // Get user info from the getCurrentUser function

    // Check if the user is authenticated and has the 'student' role
    if (!userData || userData.role !== 'student') {
      router.replace('/auth'); // Redirect to login page if not authenticated or not a student
    } else {
      setUser(userData);
      const savedPage = localStorage.getItem('selectedPage');
      if (savedPage) setSelectedPage(savedPage);

      // Fetch student data using Axios if userId exists
      const fetchData = async () => {
        if (userData?.userId) {
          try {
            const studentRes = await axios.get(`/api/student/${userData.userId}`);
            setStudentData(studentRes.data); // Set the fetched student data
          } catch (error) {
            console.error('Failed to fetch student data', error);
          }
        }
      };

      fetchData();
    }
  }, [router]);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    localStorage.setItem('selectedPage', page);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar selectedPage={selectedPage} onPageChange={handlePageChange} user={user} /> {/* Pass user data to sidebar */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {selectedPage === 'home' && <HomePage user={user} studentData={studentData} />}
          {selectedPage === 'attendance' && <AttendancePage user={user} />}
          {selectedPage === 'guidelines' && <GuidelinesPage user={user} />}
          {selectedPage === 'logs' && <Logs user={user} />}
        </div>
      </div>
    </div>
  );
}
