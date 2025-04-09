// components/coordinator/CoordinatorDashboardPage.js
export default function CoordinatorDashboardPage({ user }) {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Coordinator Dashboard</h1>
            <p className="text-gray-600 mb-4">Monitor and manage student trainees</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white shadow rounded-md p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Total Students</h2>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-bold text-blue-600">123</span>
                        {/* Add your icon here */}
                    </div>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Active Agencies</h2>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-bold text-green-600">5</span>
                        {/* Add your icon here */}
                    </div>
                </div>
                <div className="bg-white shadow rounded-md p-4">
                    <h2 className="text-lg font-semibold text-gray-700">Completed OJT</h2>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-3xl font-bold text-yellow-600">30</span>
                        {/* Add your icon here */}
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-md p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Student Progress Overview</h2>
                {/* Add your filters (Course, Year Level) here */}
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
                            <tr>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Jerrel Del Puerto</p>
                                    <p className="text-gray-500 text-xs whitespace-no-wrap">BSCRIM</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Fire station</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">303/600</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <div className="relative pt-1">
                                        <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-green-200">
                                            <div style={{ width: '50%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">On track</span>
                                    </span>
                                </td>
                            </tr>
                            {/* Add more student progress rows */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}