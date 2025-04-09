// components/coordinator/AddStudentModal.js
import { useState } from 'react';

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
    const [studentName, setStudentName] = useState('');
    const [course, setCourse] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [organization, setOrganization] = useState('');

    const handleAddStudent = () => {
        const newStudent = {
            fullName: studentName,
            course: course,
            schoolYear: schoolYear,
            email: emailAddress,
            address: address,
            contact: phoneNumber,
            organization: organization,
        };
        onAdd(newStudent); // Pass the new student data to the parent component
        onClose(); // Close the modal
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
                <div className="space-y-3">
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student name</label>
                        <input
                            type="text"
                            id="studentName"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-3">
                        <div className="w-1/2">
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                            <input
                                type="text"
                                id="course"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="schoolYear" className="block text-sm font-medium text-gray-700">School Year</label>
                            <input
                                type="text"
                                id="schoolYear"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
                        <input
                            type="text"
                            id="organization"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddStudent}
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
}