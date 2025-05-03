import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/utils/auth';

const StudentAndArchivePage = () => {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [archivedBy, setArchivedBy] = useState('');

  const [selectedYear, setSelectedYear] = useState(null);
  const [studentsInYear, setStudentsInYear] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    category: '',
    year: ''
  });

  const fetchArchives = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/archived-data');
      const data = await response.json();
      if (response.ok) {
        setArchives(data);
      } else {
        setError(data.message || 'Error fetching archives');
      }
    } catch {
      setError('Failed to fetch archives');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentsByYear = async (year) => {
    setStudentsLoading(true);
    try {
      const response = await fetch(`/api/students-by-year?year=${year}`);
      const data = await response.json();
      if (response.ok) {
        setStudentsInYear(data);
      } else {
        setError(data.message || 'Error fetching students');
      }
    } catch {
      setError('Failed to fetch students');
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleArchiveClick = (year) => {
    setSelectedYear(year);
    fetchStudentsByYear(year);
    setIsStudentModalOpen(true);
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setArchivedBy(currentUser.name || 'Admin');
    }
  }, []);

  useEffect(() => {
    fetchArchives();
  }, []);

  const validateInputs = () => {
    const errors = {
      title: title.trim() === '' ? 'Title is required' : '',
      category: category.trim() === '' ? 'Category is required' : '',
      year: year < 1900 || year > new Date().getFullYear() ? 'Year must be between 1900 and current year' : ''
    };

    setValidationErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  const handleManualArchive = async () => {
    if (!validateInputs()) return;

    setIsArchiving(true);

    try {
      const response = await fetch(`/api/archived-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, category, year, archivedBy }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchArchives();
        setTitle('');
        setCategory('');
        setIsModalOpen(false);
      } else {
        setError(data.message || 'Error during manual archiving');
      }
    } catch {
      setError('Failed to manually archive data');
    } finally {
      setIsArchiving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Profile and Archives</h1>

      {/* Archive Button */}
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Archive Today's Records
        </button>
      </div>

      {/* Manual Archive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Manual Archive</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {validationErrors.title && <p className="text-red-500">{validationErrors.title}</p>}

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              {validationErrors.category && <p className="text-red-500">{validationErrors.category}</p>}

              <input
                type="number"
                placeholder="Year"
                value={year}
                max={new Date().getFullYear()}
                onChange={(e) =>
                  setYear(Math.min(Number(e.target.value), new Date().getFullYear()))
                }
                className="w-full px-4 py-2 border rounded"
                required
              />
              {validationErrors.year && <p className="text-red-500">{validationErrors.year}</p>}

              <input
                type="text"
                value={archivedBy}
                disabled
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleManualArchive}
                  disabled={isArchiving}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isArchiving ? 'Archiving...' : 'Archive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Archive Table */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold">Archived Records</h3>
        {archives.length > 0 ? (
          <table className="min-w-full mt-4 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Archived On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Archived By</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {archives.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleArchiveClick(item.year)}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.dateArchived}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.archivedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4">No archives found</p>
        )}
      </div>

      {/* Student List Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setIsStudentModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Students Archived in {selectedYear ?? 'N/A'}
            </h2>

            {studentsLoading ? (
              <p>Loading students...</p>
            ) : studentsInYear.length > 0 ? (
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {studentsInYear.map((student) => (
                  <li key={student.id} className="border p-2 rounded text-sm">
                    {student.first_name} {student.last_name} ({student.student_id})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found for {selectedYear}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAndArchivePage;
