import { useState } from 'react';

export default function CoordinatorPage() {
    const [activeTab, setActiveTab] = useState('list');
    const coordinators = [
        {
            id: 1,
            name: 'Jerrel John Del Puerto',
            contact: '08977295402',
            email: 'jerreljohndelpuerto@gmail.com',
            username: 'JerJohn',
            password: '********',
        },
        // Add more coordinator data here
    ];

    return (
        <div className="bg-gray-50  p-8 overflow-hidden"> {/* Prevents any overflow from the main content */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Coordinators</h2>

                {/* Tab Navigation */}
                <div className="flex border-b mb-6">
                    <button
                        className={`py-3 px-6 rounded-t-lg text-lg font-medium ${
                            activeTab === 'list'
                                ? 'border-b-4 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                        onClick={() => setActiveTab('list')}
                    >
                        Coordinators List
                    </button>
                    <button
                        className={`py-3 px-6 rounded-t-lg text-lg font-medium ${
                            activeTab === 'add'
                                ? 'border-b-4 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
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
                            placeholder="Search coordinators"
                            className="shadow-md focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg p-3"
                        />
                        <button
                            className="bg-blue-600 text-white py-3 px-6 rounded-md ml-4 hover:bg-blue-700 transition duration-300"
                        >
                            Search
                        </button>
                    </div>
                )}

                {/* Coordinator List Table */}
                {activeTab === 'list' && (
                    <div className="overflow-x-auto max-h-80">
                        <table className="min-w-full table-auto border-collapse text-sm text-left">
                            <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                    <th className="py-3 px-6 border-b">COORDINATOR NAME</th>
                                    <th className="py-3 px-6 border-b">CONTACT</th>
                                    <th className="py-3 px-6 border-b">EMAIL</th>
                                    <th className="py-3 px-6 border-b">USERNAME</th>
                                    <th className="py-3 px-6 border-b">PASSWORD</th>
                                    <th className="py-3 px-6 border-b">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coordinators.map((coordinator) => (
                                    <tr key={coordinator.id} className="hover:bg-blue-50">
                                        <td className="py-3 px-6 border-b">{coordinator.name}</td>
                                        <td className="py-3 px-6 border-b">{coordinator.contact}</td>
                                        <td className="py-3 px-6 border-b">{coordinator.email}</td>
                                        <td className="py-3 px-6 border-b">{coordinator.username}</td>
                                        <td className="py-3 px-6 border-b">{coordinator.password}</td>
                                        <td className="py-3 px-6 border-b">
                                            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add New Coordinator Form */}
                {activeTab === 'add' && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Coordinator</h3>
                        <p className="text-gray-600 mb-4">This section will contain the form to add a new coordinator.</p>
                        {/* Add your form elements here */}
                    </div>
                )}
        </div>
    );
}
