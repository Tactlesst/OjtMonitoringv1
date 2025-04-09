// pages/student/studentpage/AttendancePage.js
import React from 'react';

const AttendancePage = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      {/* Add your attendance table or components here */}
      <p className="text-gray-700">This page will display your detailed attendance records.</p>
      {/* Example Table Structure (replace with your actual data) */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Check-in Time
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Check-out Time
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-5 py-5 border-b text-sm">
                2025-04-09
              </td>
              <td className="px-5 py-5 border-b text-sm">
                08:00 AM
              </td>
              <td className="px-5 py-5 border-b text-sm">
                12:00 NN
              </td>
              <td className="px-5 py-5 border-b text-sm">
                Late
              </td>
            </tr>
            <tr>
              <td className="px-5 py-5 border-b text-sm">
                2025-04-09
              </td>
              <td className="px-5 py-5 border-b text-sm">
                01:00 PM
              </td>
              <td className="px-5 py-5 border-b text-sm">
                05:00 PM
              </td>
              <td className="px-5 py-5 border-b text-sm">
                Absent
              </td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;