import { useState, useEffect } from 'react';

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    student_id: '',
  });

  useEffect(() => {
    fetchStudents();
  }, [searchTerm]);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`/api/studentdata?search=${searchTerm}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClick = () => {
    setEditStudent(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      student_id: '',
    });
    setModalOpen(true);
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setFormData({
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      student_id: student.student_id,
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `/api/studentdata/${formData.id}` : '/api/studentdata';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setModalOpen(false);
      fetchStudents();
    } catch (err) {
      console.error('Error saving student:', err);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4 shadow-md rounded-lg bg-white">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b-2 pb-2">
          Student Management
        </h2>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search students by name"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 mr-4"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleAddClick}
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mt-4">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium">STUDENT NAME</th>
                <th className="px-4 py-3 text-left font-medium">STUDENT ID</th>
                <th className="px-4 py-3 text-left font-medium">EMAIL</th>
                <th className="px-4 py-3 text-left font-medium">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50 transition-colors">
                  <td className="border px-4 py-3">{`${student.first_name} ${student.last_name}`}</td>
                  <td className="border px-4 py-3">{student.student_id}</td>
                  <td className="border px-4 py-3">{student.email}</td>
                  <td className="border px-4 py-3">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500 italic">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
              <h3 className="text-2xl font-semibold text-blue-700 mb-6 border-b-2 pb-2">
                {editStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleFormChange}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleFormChange}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="student_id"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleFormChange}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="mr-3 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {editStudent ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
