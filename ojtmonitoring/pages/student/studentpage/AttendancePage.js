import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const AttendancePage = ({ user }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [expandedDates, setExpandedDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      const fetchAttendance = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/student-attendance?id=${user.userId}`);
          if (!res.ok) throw new Error('Failed to fetch attendance.');
          const data = await res.json();
          setAttendanceRecords(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAttendance();
    }
  }, [user]);

  const toggleRow = (index) => {
    setExpandedDates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderStatus = (status) => {
    if (!status) return 'N/A';
    const baseClass = 'font-semibold';
    if (status.toLowerCase() === 'present') return <span className={`text-green-600 ${baseClass}`}>{status}</span>;
    if (status.toLowerCase() === 'late') return <span className={`text-yellow-600 ${baseClass}`}>{status}</span>;
    if (status.toLowerCase() === 'absent') return <span className={`text-red-600 ${baseClass}`}>{status}</span>;
    return <span className="text-gray-600">{status}</span>;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Attendance History</h2>

      {loading ? (
        <p>Loading attendance...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : attendanceRecords.length === 0 ? (
        <p className="text-gray-500">No attendance records available.</p>
      ) : (
        <ul className="space-y-2">
          {attendanceRecords.map((record, index) => {
            const isOpen = expandedDates[index];
            return (
              <li key={index} className="border rounded-md">
                <button
                  onClick={() => toggleRow(index)}
                  className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-100"
                >
                  <span className="font-medium">{dayjs(record.date).format('MMM DD, YYYY')}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-4 py-2 bg-gray-50 text-sm">
                    <div><strong>Morning Check-in:</strong> {record.checkin_morning || '—'}</div>
                    <div><strong>Morning Check-out:</strong> {record.checkout_morning || '—'}</div>
                    <div><strong>Morning Status:</strong> {renderStatus(record.status_morning)}</div>
                    <div><strong>Afternoon Check-in:</strong> {record.checkin_afternoon || '—'}</div>
                    <div><strong>Afternoon Check-out:</strong> {record.checkout_afternoon || '—'}</div>
                    <div><strong>Afternoon Status:</strong> {renderStatus(record.status_afternoon)}</div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AttendancePage;
