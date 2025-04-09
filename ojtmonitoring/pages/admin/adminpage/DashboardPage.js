// components/admin/DashboardPage.js
export default function DashboardPage() {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
            <h3 className="font-semibold text-gray-700">Total Students</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">123</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
            <h3 className="font-semibold text-gray-700">Active Coordinators</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">5</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
            <h3 className="font-semibold text-gray-700">Organizations</h3>
            <p className="text-4xl font-bold text-yellow-600 mt-2">10</p>
          </div>
        </div>
  
        {/* Additional Metrics Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
          <h3 className="font-semibold text-gray-700 mb-4">System Health</h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">System Status</p>
              <p className="text-green-600">All Systems Operational</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">Database Status</p>
              <p className="text-green-600">Connected</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  