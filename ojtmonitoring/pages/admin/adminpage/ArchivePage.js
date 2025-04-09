// components/admin/ArchivePage.js
import { useState } from 'react';

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample archive data
  const archiveData = [
    { 
      id: 1, 
      title: '2023 Student Records', 
      category: 'students', 
      year: 2023,
      dateArchived: '2023-12-15',
      archivedBy: 'Admin Nazai'
    },
    { 
      id: 2, 
      title: 'Q2 2023 Organization Reports', 
      category: 'organizations', 
      year: 2023,
      dateArchived: '2023-06-30',
      archivedBy: 'Coordinator Lee'
    },
    { 
      id: 3, 
      title: '2022 Training Materials', 
      category: 'materials', 
      year: 2022,
      dateArchived: '2022-12-20',
      archivedBy: 'Admin Nazai'
    },
    { 
      id: 4, 
      title: '2021 Financial Records', 
      category: 'finance', 
      year: 2021,
      dateArchived: '2021-12-10',
      archivedBy: 'Coordinator Robert'
    },
  ];

  // Filter data based on search and filters
  const filteredData = archiveData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  // Get unique years for filter
  const years = [...new Set(archiveData.map(item => item.year))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Archive Management</h1>
      
      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search archives..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="students">Students</option>
            <option value="organizations">Organizations</option>
            <option value="materials">Training Materials</option>
            <option value="finance">Financial Records</option>
          </select>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="all">All Years</option>
            {years.sort((a, b) => b - a).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Archive Items */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archived On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Archived By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateArchived}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.archivedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-800 mr-3">Restore</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center">
          <p className="text-gray-500">No archive items found matching your criteria</p>
        </div>
      )}
    </div>
  );
}