// components/student/studentpage/Logs.js
import { useEffect, useState } from 'react';

export default function Logs({ user }) {
  const [logs, setLogs] = useState([]);

  // Fetch logs (you can replace this with an actual API call or database query)
  useEffect(() => {
    // Replace this with your actual log fetching logic
    const fetchLogs = async () => {
      try {
        // For example, mock logs
        const fetchedLogs = [
          { id: 1, timestamp: '2025-04-08 12:30:00', action: 'Logged in', details: 'User successfully logged in.' },
          { id: 2, timestamp: '2025-04-08 13:00:00', action: 'Viewed Attendance', details: 'User viewed their attendance for today.' },
          { id: 3, timestamp: '2025-04-08 13:15:00', action: 'Checked Guidelines', details: 'User checked the attendance guidelines.' },
        ];
        setLogs(fetchedLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-4">Activity Logs</h1>

      {/* Logs Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Timestamp</th>
            <th className="py-2 px-4 text-left">Action</th>
            <th className="py-2 px-4 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">No logs available</td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="py-2 px-4">{log.timestamp}</td>
                <td className="py-2 px-4">{log.action}</td>
                <td className="py-2 px-4">{log.details}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
