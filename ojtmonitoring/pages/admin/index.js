// pages/admin/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/utils/auth';
import AdminSidebar from '../admin/adminpage/AdminSidebar';
import DashboardPage from '../admin/adminpage/DashboardPage';
import CoordinatorPage from '../admin/adminpage/CoordinatorPage';
import StudentsPage from '../admin/adminpage/StudentsPage';
import OrganizationPage from '../admin/adminpage/OrganizationPage';
import ArchivePage from '../admin/adminpage/ArchivePage';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedPage, setSelectedPage] = useState('dashboard');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = getCurrentUser();
      if (!userData || userData.role !== 'admin') {
        router.replace('/auth');
      } else {
        setUser(userData);
        const savedPage = localStorage.getItem('adminSelectedPage');
        if (savedPage) setSelectedPage(savedPage);
      }
    }
  }, [router]);

  const handlePageChange = (page) => {
    setSelectedPage(page);
    localStorage.setItem('adminSelectedPage', page);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar 
        selectedPage={selectedPage} 
        onPageChange={handlePageChange} 
        user={user}
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {selectedPage === 'dashboard' && <DashboardPage />}
          {selectedPage === 'coordinator' && <CoordinatorPage />}
          {selectedPage === 'students' && <StudentsPage />}
          {selectedPage === 'organization' && <OrganizationPage />}
          {selectedPage === 'archive' && <ArchivePage />}
        </div>
      </div>
    </div>
  );
}