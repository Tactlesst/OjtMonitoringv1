// components/coordinator/CoordinatorDashboardPage.js
import { useState } from 'react';

export default function CoordinatorDashboardPage({ user }) {
    const [progressData] = useState([
        {
            student: 'Jerrel Del Puerto',
            course: 'BSCRIM',
            company: 'Fire station',
            hoursCompleted: 303,
            totalHours: 600,
            status: 'On track',
        },
        // Add more student progress data here
    ]);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Coordinator Dashboard</h2>
            <p className="text-md text-gray-600 mb-6">Monitor and manage student trainees</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Total Students</h3>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-3xl font-bold text-blue-600">123</span>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354l-2 2m0 0l-2-2m2 2v14.728a2 2 0 002 2.002h0a2 2 0 002-2.002V6.354l-2-2m2 2l2 2m-2-2l-2-2"/></svg>
                    </div>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Active Agencies</h3>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-3xl font-bold text-green-600">5</span>
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 012.255-1.813l5.165-2.165a2 2 0 012.581 0l5.165 2.165a2 2 0 012.255 1.813V19a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                    </div>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Completed OJT</h3>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-3xl font-bold text-yellow-600">30</span>
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                    </div>
                </div>
            </div>

            {/* Student Progress Overview */}
            <div className="bg-white shadow rounded-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Progress Overview</h3>
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-1">Course</label>
                        <select id="course" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                            <option>All</option>
                            <option>BSCRIM</option>
                            {/* Add more courses */}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="yearLevel" className="block text-gray-700 text-sm font-bold mb-1">Year Level</label>
                        <select id="yearLevel" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md">
                            <option>All</option>
                            <option>1st Year</option>
                            <option>2nd Year</option>
                            {/* Add more year levels */}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STUDENT</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">COMPANY</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">HOURS COMPLETED</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PROGRESS</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {progressData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{data.student}</p>
                                        <p className="text-gray-500 text-xs whitespace-no-wrap">{data.course}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{data.company}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{`${data.hoursCompleted}/${data.totalHours}`}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div className="relative pt-1">
                                            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                                                <div style={{ width: `${(data.hoursCompleted / data.totalHours) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight rounded-full bg-green-200 bg-opacity-50">
                                            <span className="relative">{data.status}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {/* Add more rows for student progress */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}