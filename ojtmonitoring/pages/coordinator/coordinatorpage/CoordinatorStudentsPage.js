import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export default function MonitorAttendancePage() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(false);

  // Evaluation modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchAttendance();
    const interval = setInterval(fetchAttendance, 60000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const url = selectedDate
        ? `/api/studentAttendance?date=${selectedDate}`
        : `/api/studentAttendance`;
      const res = await fetch(url);
      const data = await res.json();
      setAttendance(data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAttendance = (user_id, field) => {
    const record = attendance.find(a => a.user_id === user_id);
    if (!record) return '';

    const value = record[field];
    if (typeof value === 'string' && value.includes(':')) {
      const [hoursStr, minutes] = value.split(':');
      let hours = parseInt(hoursStr, 10);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    }

    return value ?? '';
  };

  // Open modal and reset modal states
  const openEvaluationModal = (student) => {
    setSelectedStudent(student);
    setRemarks('');
    setRating('');
    setModalOpen(true);
  };

  const closeEvaluationModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
    setRemarks('');
    setRating('');
  };

const handleEvaluationSubmit = async () => {
  if (!rating) {
    alert('Please select a rating.');
    return;
  }

  try {
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: selectedStudent.user_id,  // <-- use user_id here
        remarks,
        rating,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to save evaluation');
    }

    alert('Evaluation submitted!');
    closeEvaluationModal();
  } catch (err) {
    console.error(err);
    alert('Error submitting evaluation');
  }
};


  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name} ${student.student_id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance Monitor</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search students..."
          className="border p-2 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded w-full sm:w-1/3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm text-left">
              <th className="border px-4 py-2">Student ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Morning Status</th>
              <th className="border px-4 py-2">Check-in (AM)</th>
              <th className="border px-4 py-2">Check-out (AM)</th>
              <th className="border px-4 py-2">Afternoon Status</th>
              <th className="border px-4 py-2">Check-in (PM)</th>
              <th className="border px-4 py-2">Check-out (PM)</th>
              <th className="border px-4 py-2">Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.user_id} className="text-sm hover:bg-gray-50">
                <td className="border px-4 py-3">{student.student_id}</td>
                <td className="border px-4 py-3">{student.first_name} {student.last_name}</td>
                <td className={`border px-4 py-3 ${getColor(getAttendance(student.user_id, 'status_morning'))}`}>
                  {getAttendance(student.user_id, 'status_morning')}
                </td>
                <td className="border px-4 py-3">{getAttendance(student.user_id, 'checkin_morning')}</td>
                <td className="border px-4 py-3">{getAttendance(student.user_id, 'checkout_morning')}</td>
                <td className={`border px-4 py-3 ${getColor(getAttendance(student.user_id, 'status_afternoon'))}`}>
                  {getAttendance(student.user_id, 'status_afternoon')}
                </td>
                <td className="border px-4 py-3">{getAttendance(student.user_id, 'checkin_afternoon')}</td>
                <td className="border px-4 py-3">{getAttendance(student.user_id, 'checkout_afternoon')}</td>
                <td className="border px-4 py-3 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => openEvaluationModal(student)}
                  >
                    Evaluate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Modal */}
      {modalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Evaluate {selectedStudent.first_name} {selectedStudent.last_name}
            </h2>

            {/* Rating (required) */}
            <label className="block mb-2 font-semibold">
              Rating <span className="text-red-600">*</span>
            </label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Select rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>

            {/* Remarks (optional) */}
            <label className="block mb-2 font-semibold">Remarks</label>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              placeholder="Enter remarks (optional)"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={closeEvaluationModal}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEvaluationSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getColor(status) {
  switch (status?.toLowerCase()) {
    case 'late':
      return 'text-orange-600 font-semibold';
    case 'absent':
      return 'text-red-600 font-semibold';
    case 'present':
      return 'text-green-600 font-semibold';
    default:
      return '';
  }
}
