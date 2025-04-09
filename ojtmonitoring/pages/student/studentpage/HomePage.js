// pages/student/studentpage/HomePage.js
import React from 'react';

const HomePage = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* User Info Header */}
      <div className="flex items-center mb-4">
        {/* You might fetch and display the user's profile image here */}
        {/* <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div> */}
        <div>
          <h2 className="text-xl font-semibold">Welcome Back, {user?.name || 'Student'}!</h2>
          <p className="text-sm text-gray-500">Your OJT progress is on track</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gray-100 rounded-md p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Total Hours Completed</h3>
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full h-6 w-full relative">
            <div
              className="bg-blue-500 rounded-full h-6 absolute top-0 left-0"
              style={{ width: `${(234 / 600) * 100}%` }} // Dynamic width
            ></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
              234 / 600
            </span>
          </div>
          {/* <span className="ml-2 text-sm text-gray-700">234 / 600</span> */}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-4 mb-6">
        <button className="bg-white shadow-sm rounded-md px-6 py-3 flex items-center text-blue-600 border border-blue-300 hover:bg-blue-50">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z"/></svg>
          Scan QR for attendance
        </button>
        <button className="bg-white shadow-sm rounded-md px-6 py-3 flex items-center text-green-600 border border-green-300 hover:bg-green-50">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2-2H9m2-2h.01M3 21v-2a2 2 0 012-2h14a2 2 0 012 2v2m-6-3h.01M12 7h.01M15 11h.01M6 7h.01M3 4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"/></svg>
          View Guidelines
        </button>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Today's Attendance</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Check-in 1 */}
          <div className="bg-gray-100 rounded-md p-3">
            <p className="text-sm text-gray-600">Check-in Time</p>
            <p className="font-medium">08:00 AM <span className="text-green-500 text-xs">(Present)</span></p>
            <p className="text-sm text-gray-600 mt-1">Check-out Time</p>
            <p className="font-medium">12:00 NN <span className="text-yellow-500 text-xs">(Late)</span></p>
          </div>
          {/* Check-in 2 */}
          <div className="bg-gray-100 rounded-md p-3">
            <p className="text-sm text-gray-600">Check-in Time</p>
            <p className="font-medium">01:00 PM <span className="text-green-500 text-xs">(Present)</span></p>
            <p className="text-sm text-gray-600 mt-1">Check-out Time</p>
            <p className="font-medium">05:00 PM <span className="text-red-500 text-xs">(Absent)</span></p>
          </div>
        </div>
      </div>

      {/* Monthly Attendance */}
      <div className="bg-white shadow-sm rounded-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Monthly Attendance</h3>
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </button>
            <span>March 2025</span>
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          {/* Example Day Cells - Replace with dynamic data */}
          <div className="py-1">26</div>
          <div className="py-1">27</div>
          <div className="py-1 bg-blue-200 text-blue-700 font-semibold rounded-full">28</div>
          <div className="py-1 bg-green-200 text-green-700 rounded-full">1</div>
          <div className="py-1 bg-red-200 text-red-700 rounded-full">2</div>
          <div className="py-1">3</div>
          <div className="py-1">4</div>
          {/* ... more days */}
        </div>
        {/* Legend */}
        <div className="flex items-center text-sm text-gray-600 mt-2 space-x-3">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            <span>Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
            <span>Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
            <span>Late</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;