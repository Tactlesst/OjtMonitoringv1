import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'; // for date formatting

const AttendancePage = ({ user }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (user?.studentId) {
        try {
          const response = await fetch(`/api/attendance/${user.studentId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch attendance records');
          }
          const data = await response.json();
          setAttendanceRecords(data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching attendance:', err);
          setError('Failed to fetch attendance records');
          setLoading(false);
        }
      }
    };

    fetchAttendanceData();
  }, [user]);

  const renderStatus = (status) => {
    if (!status) return 'N/A';
    let colorClass = 'text-gray-600';

    if (status.toLowerCase() === 'present') {
      colorClass = 'text-green-600 font-semibold';
    } else if (status.toLowerCase() === 'late') {
      colorClass = 'text-yellow-600 font-semibold';
    } else if (status.toLowerCase() === 'absent') {
      colorClass = 'text-red-600 font-semibold';
    }

    return <span className={colorClass}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        <p className="text-gray-700">Loading your attendance records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Morning Check-in
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Morning Check-out
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Morning Status
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Afternoon Check-in
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Afternoon Check-out
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Afternoon Status
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b text-sm">
                    {dayjs(record.date).format('MMMM D, YYYY')}
                  </td>
                  <td className="px-5 py-5 border-b text-sm">{record.checkin_morning || 'N/A'}</td>
                  <td className="px-5 py-5 border-b text-sm">{record.checkout_morning || 'N/A'}</td>
                  <td className="px-5 py-5 border-b text-sm">{renderStatus(record.status_morning)}</td>
                  <td className="px-5 py-5 border-b text-sm">{record.checkin_afternoon || 'N/A'}</td>
                  <td className="px-5 py-5 border-b text-sm">{record.checkout_afternoon || 'N/A'}</td>
                  <td className="px-5 py-5 border-b text-sm">{renderStatus(record.status_afternoon)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-5 py-5 border-b text-sm text-center text-gray-500">
                  No attendance records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
