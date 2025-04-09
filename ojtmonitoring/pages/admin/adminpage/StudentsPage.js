// components/admin/StudentsPage.js
import { useState } from 'react';

export default function StudentsPage() {
    const [activeTab, setActiveTab] = useState('list');
    const students = [
        {
            id: 1,
            name: 'Jerrel John Del Puerto',
            contact: '09977285462',
            email: 'jerreljohndelpuerto@gmail.com',
            username: 'Jer**John',
            password: '********',
        },
        // Add more student data here
    ];

    const handleViewDetails = (studentId) => {
        // Logic to view details of a student (e.g., redirect to a student details page)
        alert(`Viewing details for student ID: ${studentId}`);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Students</h2>

            <div className="bg-white shadow-lg rounded-lg p-6">
                {/* Tab Navigation */}
                <div className="flex border-b mb-4">
                    <button
                        className={`py-3 px-6 ${activeTab === 'list' ? 'border-b-4 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab('list')}
                    >
                        Students List
                    </button>
                    <button
                        className={`py-3 px-6 ${activeTab === 'add' ? 'border-b-4 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-600'}`}
                        onClick={() => setActiveTab('add')}
                    >
                        + Add New
                    </button>
                </div>

                {/* Search Bar */}
                {activeTab === 'list' && (
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Search students"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
                        />
                        <button
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 ml-4 transition"
                        >
                            Search
                        </button>
                    </div>
                )}

                {/* Students List Table */}
                {activeTab === 'list' && (
                    <table className="w-full border-collapse mt-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-700">STUDENT NAME</th>
                                <th className="px-4 py-2 text-left text-gray-700">CONTACT</th>
                                <th className="px-4 py-2 text-left text-gray-700">EMAIL</th>
                                <th className="px-4 py-2 text-left text-gray-700">USERNAME</th>
                                <th className="px-4 py-2 text-left text-gray-700">PASSWORD</th>
                                <th className="px-4 py-2 text-left text-gray-700">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{student.name}</td>
                                    <td className="border px-4 py-2">{student.contact}</td>
                                    <td className="border px-4 py-2">{student.email}</td>
                                    <td className="border px-4 py-2">{student.username}</td>
                                    <td className="border px-4 py-2">{student.password}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleViewDetails(student.id)}
                                            className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* Add New Student Form (Placeholder) */}
                {activeTab === 'add' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
                        <p>This section will contain the form to add a new student.</p>
                        {/* Add your form elements here */}
                    </div>
                )}
            </div>
        </div>
    );
}
