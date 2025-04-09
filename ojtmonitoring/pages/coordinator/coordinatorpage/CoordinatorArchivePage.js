// components/coordinator/CoordinatorArchivePage.js
import { useState } from 'react';

export default function CoordinatorArchivePage({ user }) {
    const [archivedItems] = useState([
        {
            id: 1,
            itemName: 'Student Records - Batch 2023',
            type: 'Student Data',
            dateArchived: 'February 15, 2025',
            description: 'Archived records for all students who completed their OJT in 2023.',
        },
        {
            id: 2,
            itemName: 'Performance Reports - January 2025',
            type: 'Reports',
            dateArchived: 'March 01, 2025',
            description: 'Monthly performance summary and evolution reports for January 2025.',
        },
        // Add more archived items here
    ]);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Archive</h2>
            <p className="text-md text-gray-600 mb-6">Browse and manage archived data.</p>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Archived Items</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ITEM NAME</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TYPE</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE ARCHIVED</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DESCRIPTION</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archivedItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{item.itemName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{item.type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{item.dateArchived}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-600 line-clamp-2">{item.description}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {/* Action Buttons */}
                                        <div className="flex space-x-2">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                                                View
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs">
                                                Restore
                                            </button>
                                        </div>
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