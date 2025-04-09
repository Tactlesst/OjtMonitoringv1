// components/coordinator/CoordinatorReportsPage.js
import { useState } from 'react';

export default function CoordinatorReportsPage({ user }) {
    const [reports] = useState([
        {
            id: 1,
            reportName: 'Monthly Performance Summary',
            type: 'Performance',
            date: 'March 23, 2025',
            status: 'Completed',
        },
        {
            id: 2,
            reportName: 'Monthly Evolution Summary',
            type: 'Evaluations',
            date: 'March 23, 2025',
            status: 'Completed',
        },
        // Add more report data here
    ]);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>
            <p className="text-md text-gray-600 mb-6">View and manage reports for student trainees.</p>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Percentage of Students who submitted the requirements or task</h3>
                <div className="border border-gray-300 rounded-md p-4 h-32 flex items-center justify-center text-gray-500 italic">
                    {/* Placeholder for the chart/visualization */}
                    Visualization will be displayed here.
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">General Reports</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">REPORT NAME</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TYPE</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.reportName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{report.date}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold text-${report.status === 'Completed' ? 'green' : 'yellow'}-900 leading-tight rounded-full bg-${report.status === 'Completed' ? 'green' : 'yellow'}-200 bg-opacity-50`}>
                                            <span className="relative">{report.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {/* Add action buttons or links here */}
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}