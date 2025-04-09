// components/admin/LogsPage.js
export default function LogsPage() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
        <p className="text-lg">This page shows the logs of user activities and system events. You can filter logs based on various criteria.</p>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Recent Activities</h3>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Timestamp</th>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">2025-04-09 10:30:00</td>
                <td className="border px-4 py-2">Admin</td>
                <td className="border px-4 py-2">Logged in</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2025-04-09 10:45:00</td>
                <td className="border px-4 py-2">User1</td>
                <td className="border px-4 py-2">Viewed Profile</td>
              </tr>
              {/* Add more rows for other log entries */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  