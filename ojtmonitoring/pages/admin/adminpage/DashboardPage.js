import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function DashboardPage() {
  const [counts, setCounts] = useState({ studentCount: 0, coordinatorCount: 0, organizationCount: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [userRes, orgRes] = await Promise.all([
          fetch('/api/admin/student-count'),
          fetch('/api/admin/organization-count')
        ]);
        const userData = await userRes.json();
        const orgData = await orgRes.json();

        setCounts({
          studentCount: userData.studentCount,
          coordinatorCount: userData.coordinatorCount,
          organizationCount: orgData.organizationCount,
        });
      } catch (err) {
        console.error('Failed to fetch counts:', err);
      }
    }

    fetchCounts();
  }, []);

  const chartData = [
    { name: 'Students', count: counts.studentCount },
    { name: 'Coordinators', count: counts.coordinatorCount },
    { name: 'Organizations', count: counts.organizationCount },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        <StatCard label="Total Students" value={counts.studentCount} color="text-blue-600" />
        <StatCard label="Active Coordinators" value={counts.coordinatorCount} color="text-green-600" />
        <StatCard label="Organizations" value={counts.organizationCount} color="text-yellow-600" />
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center">
      <h3 className="font-semibold text-gray-700">{label}</h3>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
}
