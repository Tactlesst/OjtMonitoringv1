import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qr.js';
import ReactCalendar from 'react-calendar';
import dayjs from 'dayjs';
import styled from 'styled-components';

const StyledCalendar = styled(ReactCalendar)`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 5px 10px;
  }

  .react-calendar__month-view__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 8px;
    background-color: #eee;
    color: #555;
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .react-calendar__month-view__days__day {
    padding: 8px;
    text-align: center;
    border: 1px solid #eee;
    position: relative; /* For absolute positioning of indicators */
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d14d4d;
  }

  .react-calendar__month-view__days__day--active {
    background-color: #007bff;
    color: white;
    border-color: #0056b3;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #777;
  }

  .react-calendar__tile {
    background: none;
    border: none;
    text-align: center;
    padding: 0.75em 0.5em;
    position: relative; /* For absolute positioning of indicators */
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    color: #999;
  }

  .react-calendar__tile--now {
    background: #e6e6fa;
  }

  .react-calendar__tile--now:hover,
  .react-calendar__tile--now:focus {
    background: #adadff;
  }

  .react-calendar__tile--hasActive {
    background: #f0f8ff;
  }

  .react-calendar__tile--hasActive:hover,
  .react-calendar__tile--hasActive:focus {
    background: #e0f2f7;
  }

  .react-calendar__tile--active {
    background: #007bff;
    color: white;
  }

  .react-calendar__tile--active:hover,
  .react-calendar__tile--active:focus {
    background: #0056b3;
  }

  /* Custom indicators */
  .present-indicator,
  .absent-indicator,
  .holiday-indicator,
  .present-holiday-indicator {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .present-indicator {
    background-color: #a7f3d0; /* Light green */
    border: 1px solid #34d399; /* Darker green border */
  }

  .absent-indicator {
    background-color: #fef08a; /* Light yellow */
    border: 1px solid #facc15; /* Darker yellow border */
  }

  .holiday-indicator {
    background-color: #fca5a5; /* Light red */
    border: 1px solid #f87171; /* Darker red border */
  }

  .present-holiday-indicator {
    background-color: #d8b4fe; /* Light purple */
    border: 1px solid #9333ea; /* Darker purple border */
  }
`;

const HomePage = ({ user }) => {
  const [studentData, setStudentData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [yesterdayAttendanceData, setYesterdayAttendanceData] = useState(null);
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
      const datesWithStatus = attendanceData.history.map(item => {
        const isMorningAbsent = item.status_morning === 'absent';
        const isAfternoonAbsent = item.status_afternoon === 'absent';
        const isPresent = !(isMorningAbsent && isAfternoonAbsent);
  
        return {
          date: dayjs(item.date).format('YYYY-MM-DD'),
          status: isPresent ? 'present' : 'absent',  // Simplified handling based on morning and afternoon
        };
      });
      setMarkedDates(datesWithStatus);
    }
  
    const fetchHolidays = async () => {
      try {
        const res = await fetch('/api/holidays');
        const holidayData = await res.json();
        const holidayDates = holidayData.map(h => dayjs(h.date).format('YYYY-MM-DD'));
        setHolidays(holidayDates);
      } catch (error) {
        console.error('Failed to fetch holidays:', error);
      }
    };
  
    fetchHolidays();
  }, [attendanceData]);
  
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const isPresent = markedDates.some(d => d.date === formattedDate && d.status === 'present');
      const isAbsent = markedDates.some(d => d.date === formattedDate && d.status === 'absent');
      const isHoliday = holidays.includes(formattedDate);
  
      if (isPresent && isHoliday) {
        return <div className="present-holiday-indicator" />;
      } else if (isPresent) {
        return <div className="present-indicator" />;
      } else if (isAbsent) {
        return <div className="absent-indicator" />;
      } else if (isHoliday) {
        return <div className="holiday-indicator" />;
      }
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

  const renderAttendance = (attendance) => (
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
  <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min((studentData?.totalHours / 600) * 100, 100)}%` }}
    ></div>
    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
      {studentData?.totalHours || 0} / 600
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

      {showQRCodeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleQRCodeModal}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-center">Your QR Code</h2>
            <canvas ref={canvasRef} width={256} height={256} />
          </div>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Today's Attendance</h3>
        {attendanceData ? renderAttendance(attendanceData) : <p>No records found for today.</p>}
      </div>

      <div className="bg-white shadow-sm rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Yesterday's Attendance</h3>
        {yesterdayAttendanceData ? renderAttendance(yesterdayAttendanceData) : <p>No records found for yesterday.</p>}
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📅 Attendance Calendar</h3>
        <div className="flex justify-center">
          <StyledCalendar
            tileContent={tileContent}
          />
        </div>

        <div className="flex justify-center space-x-6 mt-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-green-400 border border-green-600"></span>
            <span>Present</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-yellow-300 border border-yellow-500"></span>
            <span>Absent</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-red-400 border border-red-500"></span>
            <span>Holiday</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 rounded-full bg-purple-500 border border-purple-600"></span>
            <span>Present & Holiday</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;