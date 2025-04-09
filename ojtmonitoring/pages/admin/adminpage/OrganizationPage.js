// components/admin/OrganizationPage.js

import { useState } from 'react';

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState('list');
  
  const organizationData = {
    name: 'Criminal Justice Department',
    departments: [
      { id: 1, name: 'Police Department', head: 'Chief Robert Lang', email: 'police@cjd.org' },
      { id: 2, name: 'Forensic Analysis', head: 'Dr. Emily Carter', email: 'forensics@cjd.org' },
      { id: 3, name: 'Criminal Investigations', head: 'Lt. James Walker', email: 'investigations@cjd.org' },
      { id: 4, name: 'Victim Support', head: 'Sarah Johnson', email: 'support@cjd.org' },
    ],
  };

  const handleAddDepartment = () => {
    // Logic for adding a new department
    alert('Adding new department');
  };

  const handleEditDepartment = (departmentId) => {
    // Logic for editing department details
    alert(`Editing department ID: ${departmentId}`);
  };

  const handleDeleteDepartment = (departmentId) => {
    // Logic for deleting a department
    alert(`Deleting department ID: ${departmentId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Criminal Justice Department</h2>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 ${activeTab === 'list' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-600'}`}
            onClick={() => setActiveTab('list')}
          >
            Departments List
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'add' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-600'}`}
            onClick={() => setActiveTab('add')}
          >
            + Add New Department
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'list' && (
          <div className="flex items-center mb-4">
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
        )}

        {/* Department List Table */}
        {activeTab === 'list' && (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left text-gray-700">DEPARTMENT NAME</th>
                <th className="border px-4 py-2 text-left text-gray-700">HEAD</th>
                <th className="border px-4 py-2 text-left text-gray-700">EMAIL</th>
                <th className="border px-4 py-2 text-left text-gray-700">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {organizationData.departments.map((department) => (
                <tr key={department.id}>
                  <td className="border px-4 py-2">{department.name}</td>
                  <td className="border px-4 py-2">{department.head}</td>
                  <td className="border px-4 py-2">{department.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEditDepartment(department.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDepartment(department.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add New Department Form (Placeholder) */}
        {activeTab === 'add' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Add New Department</h3>
            <p>This section will contain the form to add a new department.</p>
            {/* Add your form elements here */}
          </div>
        )}
      </div>
    </div>
  );
}
