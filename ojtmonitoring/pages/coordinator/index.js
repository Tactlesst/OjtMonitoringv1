import { useState } from 'react'; // Import useState from React
import CoordinatorSidebar from '../coordinator/coordinatorpage/CoordinatorSidebar';
import CoordinatorDashboardPage from '../coordinator/coordinatorpage/CoordinatorDashboardPage'; // Create this next
import CoordinatorStudentsPage from '../coordinator/coordinatorpage/CoordinatorStudentsPage'; // Create this next
import CoordinatorReportsPage from '../coordinator/coordinatorpage/CoordinatorReportsPage'; // Create this next
import CoordinatorArchivePage from '../coordinator/coordinatorpage/CoordinatorArchivePage'; // Create this next

export default function CoordinatorIndex() {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const user = { name: 'Coordinator ' }; // Example user data - replace with your actual user data

  const handlePageChange = (page) => {
      setSelectedPage(page);
  };

  return (
      <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar */}
          <CoordinatorSidebar selectedPage={selectedPage} onPageChange={handlePageChange} user={user} />

          {/* Main Content */}
          <div className="flex-1 p-6">
              {selectedPage === 'dashboard' && <CoordinatorDashboardPage user={user} />}
              {selectedPage === 'students' && <CoordinatorStudentsPage user={user} />}
              {selectedPage === 'reports' && <CoordinatorReportsPage user={user} />}
              {selectedPage === 'archive' && <CoordinatorArchivePage user={user} />}
          </div>
      </div>
  );
}
