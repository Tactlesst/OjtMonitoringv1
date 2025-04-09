// components/admin/UserManagementPage.js
export default function UserManagementPage() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <p className="text-lg">This is where you can manage the users. You can add, update, or delete user profiles, as well as assign roles and permissions.</p>
        <div className="mt-6">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add New User
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Existing Users</h3>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">User Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">john.doe@example.com</td>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white py-1 px-3 rounded-md">Edit</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded-md ml-2">Delete</button>
                </td>
              </tr>
              {/* Add more rows for other users */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  