import { useEffect, useState } from 'react';

export default function CoordinatorPage() {
  const [coordinators, setCoordinators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'coordinator',
    disabled: 0,
  });

  const fetchCoordinators = async () => {
    try {
      const response = await fetch('/api/coordinators');
      const data = await response.json();
      setCoordinators(data);
    } catch (err) {
      console.error('Error fetching coordinators:', err);
    }
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `/api/coordinators/${formData.id}` : '/api/coordinators1';

    const submitData = { ...formData };

    // Password handling logic is removed here - API will handle hashing
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(isEditMode ? 'Coordinator updated successfully' : 'Coordinator added successfully');
        setShowModal(false);
        // Reset form
        setFormData({
          id: '',
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          role: 'coordinator',
          disabled: 0,
        });
        fetchCoordinators(); // Refresh list
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (coordinator) => {
    setFormData({
      id: coordinator.id,
      first_name: coordinator.first_name,
      last_name: coordinator.last_name,
      email: coordinator.email,
      password: '',
      role: 'coordinator',
      disabled: coordinator.disabled,
    });
    setIsEditMode(true);
    setShowPassword(false);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 'coordinator',
      disabled: 0,
    });
    setIsEditMode(false);
    setShowPassword(false);
    setShowModal(true);
  };

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4 shadow-md rounded-lg bg-white">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 border-b-2 pb-2">
          Coordinators Management
        </h2>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white py-3 px-6 rounded-md mb-6 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Coordinator
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm text-left">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="py-3 px-4 border-b">COORDINATOR NAME</th>
                <th className="py-3 px-4 border-b">EMAIL</th>

                <th className="py-3 px-4 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50">
                  <td className="py-3 px-4 border-b">{c.first_name} {c.last_name}</td>
                  <td className="py-3 px-4 border-b">{c.email}</td>

                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {coordinators.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500 italic">
                    No coordinators found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
                {isEditMode ? 'Edit Coordinator' : 'Add New Coordinator'}
              </h3>
              <form onSubmit={handleSubmit}>
                {['first_name', 'last_name', 'email'].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2 capitalize">{field.replace('_', ' ')}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2"
                    />
                  </div>
                ))}

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2"
                      placeholder={isEditMode ? 'Leave blank to keep current password' : 'Enter password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-600"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {isEditMode && !formData.password && (
                    <p className="text-xs text-gray-500 mt-1 italic">Leave blank to keep the existing password.</p>
                  )}
                </div>

                {/* Disabled */}
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="disabled"
                      checked={formData.disabled === 1}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          disabled: prev.disabled === 1 ? 0 : 1,
                        }))
                      }
                      className="mr-2"
                    />
                    Disabled
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {isEditMode ? 'Save Changes' : 'Add Coordinator'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
