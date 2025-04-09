// components/coordinator/CoordinatorStudentsPage.js
import { useState } from 'react';
import AddStudentModal from './AddStudentModal'; // Import the modal component

export default function CoordinatorStudentsPage({ user }) {
    const [activeTab, setActiveTab] = useState('list');
    const [students, setStudents] = useState([
        {
            id: 1,
            schoolId: 'C230049',
            fullName: 'Jerrel John Del Puerto',
            course: 'BSCRIM',
            contact: '09977295462',
            email: 'jerreljohndelpuerto@gmail.com',
            address: 'Brgy. 1',
            schoolYear: '2024-2025',
            organization: 'Fire Station',
        },
        // Add more student data here
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddStudent = (newStudent) => {
        // In a real application, you would send this data to your API
        console.log('Adding new student:', newStudent);
        setStudents([...students, { id: Date.now(), ...newStudent }]); // Update local state
        closeAddModal();
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Students</h2>

            <div className="bg-white shadow-md rounded-lg p-6">
                {/* Tab Navigation */}
                <div className="flex border-b mb-4">
                    <button
                        className={`py-2 px-4 ${
                            activeTab === 'list'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                                : 'text-gray-600'
                        }`}
                        onClick={() => setActiveTab('list')}
                    >
                        Students List
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === 'add'
                                ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                                : 'text-gray-600'
                        }`}
                        onClick={() => setActiveTab('add')}
                    >
                        + Add New
                    </button>
                </div>

                {/* Search Bar and Filters */}
                {activeTab === 'list' && (
                    <div className="mb-4">
                        <div className="flex items-center mb-2">
                            <input
                                type="text"
                                placeholder="Search here"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ml-2"
                            >
                                Search
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div>
                                <label htmlFor="courseFilter" className="block text-gray-700 text-sm font-bold mb-1">Course</label>
                                <select id="courseFilter" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                    <option>All</option>
                                    <option>BSCRIM</option>
                                    {/* Add more courses */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="yearLevelFilter" className="block text-gray-700 text-sm font-bold mb-1">Year Level</label>
                                <select id="yearLevelFilter" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                    <option>All</option>
                                    <option>2024-2025</option>
                                    {/* Add more year levels */}
                                </select>
                            </div>
                            {/* Add more filters if needed */}
                        </div>
                    </div>
                )}

                {/* Student List Table */}
                {activeTab === 'list' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SCHOOL ID</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">FULL NAME</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">COURSE</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CONTACT</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">EMAIL</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ADDRESS</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SCHOOL YEAR</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ORGANIZATION</th>
                                    <th className="px-3 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student.id}>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{index + 1}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.schoolId}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.fullName}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.course}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.contact}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.email}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.address}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.schoolYear}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">{student.organization}</td>
                                        <td className="px-3 py-2 border-b border-gray-200 text-sm">
                                            {/* Add action buttons here, e.g., View, Edit, Delete */}
                                            <button className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 text-xs">
                                                +
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add New Student Section */}
                {activeTab === 'add' && (
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
                        <p>Click the button below to open the add student form.</p>
                        <button
                            onClick={openAddModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add New Student
                        </button>
                    </div>
                )}
            </div>

            {/* Add Student Modal */}
            <AddStudentModal isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={handleAddStudent} />
        </div>
    );
}