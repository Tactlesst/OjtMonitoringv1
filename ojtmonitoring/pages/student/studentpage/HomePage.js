import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qr.js';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

const HomePage = ({ user }) => {
  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [yesterdayAttendanceData, setYesterdayAttendanceData] = useState(null); // Store yesterday's attendance
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const canvasRef = useRef(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.userId) {
        try {
          setLoading(true);

          const studentRes = await fetch(`/api/student/${user.userId}`);
          const studentData = await studentRes.json();
          setStudentData(studentData);

          const attendanceRes = await fetch(`/api/attendance/${user.userId}`);
          const attendanceData = await attendanceRes.json();
          setAttendanceData(attendanceData);

          // Fetch yesterday's attendance data
          const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
          const yesterdayAttendanceRes = await fetch(`/api/attendance/${user.userId}?date=${yesterday}`);
          const yesterdayAttendanceData = await yesterdayAttendanceRes.json();
          setYesterdayAttendanceData(yesterdayAttendanceData);

          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (attendanceData?.history) {
      const dates = attendanceData.history.map(item => new Date(item.date));
      setMarkedDates(dates);
    }

    const fetchHolidays = async () => {
      try {
        const res = await fetch('/api/holidays');
        const holidayData = await res.json();
        const holidayDates = holidayData.map(h => new Date(h.date));
        setHolidays(holidayDates);
      } catch (error) {
        console.error('Failed to fetch holidays:', error);
      }
    };

    fetchHolidays();
  }, [attendanceData]);

  const tileClassName = ({ date }) => {
    const isMarked = markedDates.some(d => d.toDateString() === date.toDateString());
    const isHoliday = holidays.some(h => h.toDateString() === date.toDateString());

    if (isMarked && isHoliday) {
      return 'bg-green-500 text-white font-semibold border-2 border-green-600';
    }
    if (isMarked) {
      return 'bg-blue-400 text-white font-semibold border-2 border-blue-500';
    }
    if (isHoliday) {
      return 'bg-red-400 text-white font-semibold border-2 border-red-500';
    }
    return null;
  };

  const toggleQRCodeModal = () => setShowQRCodeModal(!showQRCodeModal);

  const qrData = JSON.stringify({
    userId: user?.userId,
    firstName: studentData?.name?.split(' ')[0] || '',
    firstName2: studentData?.name?.split(' ')[1] || '',
    lastName: studentData?.name?.split(' ')[2] || '',
    totalHours: studentData?.totalHours || 0,
    email: studentData?.email || '',
    student_id: studentData?.studentId || ''
  });

  useEffect(() => {
    if (showQRCodeModal && canvasRef.current) {
      const qr = new QRCode(qrData);
      const cells = qr.modules;
      const size = 256;
      const cellSize = size / cells.length;

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, size, size);

      cells.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
          ctx.fillStyle = cell ? '#000000' : '#ffffff';
          ctx.fillRect(cIdx * cellSize, rIdx * cellSize, cellSize, cellSize);
        });
      });
    }
  }, [showQRCodeModal, qrData]);

  if (loading) return <div>Loading...</div>;

  const renderAttendance = (attendance) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 rounded-md p-3">
          <h4 className="font-semibold">Morning</h4>
          <p className="text-sm text-gray-600">Check-in Time</p>
          <p className="font-medium">{attendance?.morning?.checkIn || 'Not Available'}</p>

          <p className="text-sm text-gray-600 mt-1">Check-out Time</p>
          <p className="font-medium">{attendance?.morning?.checkOut || 'Not Available'}</p>

          <p className="text-sm text-gray-600 mt-1">Status</p>
          <p className={`font-medium capitalize ${
            attendance?.morning?.status === 'present' ? 'text-green-600' :
            attendance?.morning?.status === 'late' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {attendance?.morning?.status || 'N/A'}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md p-3">
          <h4 className="font-semibold">Afternoon</h4>
          <p className="text-sm text-gray-600">Check-in Time</p>
          <p className="font-medium">{attendance?.afternoon?.checkIn || 'Not Available'}</p>

          <p className="text-sm text-gray-600 mt-1">Check-out Time</p>
          <p className="font-medium">{attendance?.afternoon?.checkOut || 'Not Available'}</p>

          <p className="text-sm text-gray-600 mt-1">Status</p>
          <p className={`font-medium capitalize ${
            attendance?.afternoon?.status === 'present' ? 'text-green-600' :
            attendance?.afternoon?.status === 'late' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {attendance?.afternoon?.status || 'N/A'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">
            Welcome Back, <span className="capitalize">{studentData?.name || 'Student'}</span>!
          </h2>
          <p className="text-sm text-gray-500">Your OJT progress is on track</p>
        </div>
      </div>

      <div className="bg-gray-100 rounded-md p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Total Hours Completed</h3>
        <div className="flex items-center">
          <div className="bg-gray-200 rounded-full h-6 w-full relative">
            <div
              className="bg-blue-500 rounded-full h-6 absolute top-0 left-0"
              style={{ width: `${(studentData?.totalHours / 600) * 100}%` }}
            ></div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
              {studentData?.totalHours || 0} / 600
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button 
          onClick={toggleQRCodeModal}
          className="bg-white shadow-sm rounded-md px-6 py-3 flex items-center text-blue-600 border border-blue-300 hover:bg-blue-50"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
          Generate QR
        </button>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Today's Attendance</h3>
        {attendanceData ? renderAttendance(attendanceData) : <p>No records found for today.</p>}
      </div>

      {/* Yesterday's Attendance */}
      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Yesterday's Attendance</h3>
        {yesterdayAttendanceData ? renderAttendance(yesterdayAttendanceData) : <p>No records found for yesterday.</p>}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📅 Attendance Calendar</h3>

        <div className="flex justify-center">
          <ReactCalendar
            tileClassName={tileClassName}
            className="react-calendar border-none rounded-lg shadow-sm"
          />
        </div>

        <div className="flex justify-center space-x-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-green-200 border border-blue-300"></span>
            <span>Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-red-300 border border-red-500"></span>
            <span>Holiday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
