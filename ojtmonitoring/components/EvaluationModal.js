import React, { useState } from 'react';

export default function EvaluationModal({ student, isOpen, onClose, onSubmit }) {
  const [remarks, setRemarks] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = async () => {
    await onSubmit({ student_id: student.id, remarks, rating });
    setRemarks('');
    setRating(1);
    onClose();
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Evaluate {student.first_name} {student.last_name}</h2>
        <textarea
          placeholder="Remarks"
          className="border w-full p-2 mb-4"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            className="border p-2 w-full"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
}
