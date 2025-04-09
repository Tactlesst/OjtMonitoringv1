// pages/student/studentpage/GuidelinesPage.js
import React from 'react';

const GuidelinesPage = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">OJT Guidelines</h2>
      <p className="text-gray-700 mb-4">Please read the following guidelines carefully to ensure a successful On-the-Job Training experience.</p>

      <h3 className="text-lg font-semibold mb-2">General Guidelines</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Arrive on time for all training sessions and work assignments.</li>
        <li>Adhere to the dress code specified by the training institution and the host company.</li>
        <li>Respect the rules and regulations of the host company.</li>
        <li>Maintain a professional attitude and conduct at all times.</li>
        <li>Inform your supervisor and the training coordinator in case of absence or tardiness.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Attendance Policy</h3>
      <p className="text-gray-700 mb-4">Regular and punctual attendance is crucial for your training. Any absences must be properly excused according to the institution's policy.</p>

      <h3 className="text-lg font-semibold mb-2">Performance Expectations</h3>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Actively participate in all assigned tasks and activities.</li>
        <li>Show initiative and willingness to learn.</li>
        <li>Seek clarification when unsure about instructions.</li>
        <li>Complete all assigned tasks to the best of your ability.</li>
        <li>Accept and learn from feedback provided by your supervisor.</li>
      </ul>

      <h3 className="text-lg font-semibold mb-2">Code of Conduct</h3>
      <p className="text-gray-700 mb-4">Students are expected to maintain a high standard of ethical behavior and professionalism. Any form of misconduct will not be tolerated.</p>

      {/* You can add more guidelines as needed */}
    </div>
  );
};

export default GuidelinesPage;