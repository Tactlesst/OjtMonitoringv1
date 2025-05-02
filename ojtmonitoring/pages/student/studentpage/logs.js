import { useEffect, useState } from 'react';

export default function Logs({ user }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLogs = async () => {
      try {
        const res = await fetch(`/api/student/logs?userId=${user.userId}&student_id=${user.student_id}`);
        if (!res.ok) throw new Error('Failed to fetch logs');
        const data = await res.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  const formatTimestamp = (timestamp) =>
    new Date(timestamp).toLocaleString();

  const renderLogTable = (filteredLogs, title) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {filteredLogs.length === 0 ? (
        <p className="text-gray-600 italic">No {title.toLowerCase()}.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Timestamp</th>
                <th className="py-2 px-4 text-left">Action</th>
                <th className="py-2 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{formatTimestamp(log.timestamp)}</td>
                  <td className="py-2 px-4">{log.action}</td>
                  <td className="py-2 px-4">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Group logs
  const loginLogs = logs.filter((log) => log.action === 'Logged in');
  const attendanceLogs = logs.filter((log) =>
    log.action.toLowerCase().includes('check')
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-4">User Activity Logs</h1>

      {loading ? (
        <p className="text-gray-600">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-gray-600">No logs available.</p>
      ) : (
        <>
          {renderLogTable(loginLogs, 'Login Logs')}
          {renderLogTable(attendanceLogs, 'Attendance Logs')}
        </>
      )}
    </div>
  );
}
