import { useState, useEffect } from "react";

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]); // Initialize assignments as an array
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_email: "",
    contact_phone: "",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    // Fetch organizations (departments)
    fetch("/api/organizations")
      .then((res) => res.json())
      .then(setDepartments)
      .catch((err) => console.error("Error fetching organizations:", err));

    // Fetch student data
    fetch("/api/studentdata")
      .then((res) => res.json())
      .then(setStudents)
      .catch((err) => console.error("Error fetching students:", err));

    // Fetch department assignments
    fetch("/api/organizations")
    .then((res) => res.json())
    .then(setDepartments)
    .catch((err) => console.error("Error fetching organizations:", err));

  fetch("/api/studentdata")
    .then((res) => res.json())
    .then(setStudents)
    .catch((err) => console.error("Error fetching students:", err));

  fetchAssignments(); // ← Use consistent function
  }, []);

  const fetchAssignments = () => {
    fetch("/api/organizations/assign_student")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched assignments:", data);
        if (Array.isArray(data)) {
          setAssignments(data);
        } else {
          console.error("Expected an array of assignments, but got:", data);
        }
      })
      .catch((err) => console.error("Error fetching assignments:", err));
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredDepartments = departments.filter((d) =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditDepartment(null);
    setFormData({
      name: "",
      address: "",
      contact_email: "",
      contact_phone: "",
    });
    setModalOpen(true);
  };

  const handleEditClick = (dept) => {
    setEditDepartment(dept);
    setFormData({ ...dept });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    fetch(`/api/organizations/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => setDepartments((prev) => prev.filter((d) => d.id !== id)))
      .catch((err) => console.error("Error deleting department:", err));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editDepartment ? "PUT" : "POST";
    const url = "/api/organizations/assign_student";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editDepartment) {
          setDepartments((prev) =>
            prev.map((d) =>
              d.id === editDepartment.id ? { ...d, ...formData } : d
            )
          );
        } else {
          setDepartments((prev) => [...prev, { id: data.id, ...formData }]);
        }
        setModalOpen(false);
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  const handleAssignStudent = () => {
    if (selectedStudent && selectedDepartment) {
      // Check if the student is already assigned to the department
      const existingAssignment = assignments.find(
        (assignment) =>
          assignment.student_id === selectedStudent &&
          assignment.organization_id === selectedDepartment
      );

      if (existingAssignment) {
        alert("Student is already assigned to this department.");
        return;
      }

      // Log the department name before proceeding
      const departmentName = departments.find(
        (dept) => dept.id === selectedDepartment
      )?.name;

      console.log(`Assigning student to department: ${departmentName}`); // Log department name

      // Proceed with assignment if no existing assignment
      fetch("/api/organizations/assign_student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: selectedStudent,
          organization_id: selectedDepartment,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Student assigned successfully");
          setSelectedStudent(null);
          setSelectedDepartment(null);
          fetchAssignments(); // Re-fetch assignments to update the table
        })
        .catch((err) => console.error("Error assigning student:", err));
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4 shadow-md rounded-lg bg-white">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6 border-b-2 pb-2">
          Organizations
        </h1>

        {/* Tabs */}
        <div className="mb-4 border-b">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => setActiveTab("list")}
              className={`${
                activeTab === "list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Organization List
            </button>
            <button
              onClick={() => setActiveTab("assign")}
              className={`${
                activeTab === "assign"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Assign Student
            </button>
          </nav>
        </div>

        {/* List Tab */}
        {activeTab === "list" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search departments"
                className="shadow-sm p-3 border-gray-300 rounded-md w-full sm:w-2/3"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                onClick={handleAddClick}
                className="ml-4 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
              >
                + Add Department
              </button>
            </div>

            <ul className="divide-y divide-gray-200">
              {filteredDepartments.map((d) => (
                <li
                  key={d.id}
                  className="py-4 px-6 bg-white flex justify-between hover:bg-blue-50"
                >
                  <div>
                    <p className="text-blue-700 font-semibold">{d.name}</p>
                    <p className="text-gray-500 text-sm">{d.address}</p>
                    <p className="text-gray-500 text-sm">
                      {d.contact_email} | {d.contact_phone}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditClick(d)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(d.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Assign Tab */}
        {activeTab === "assign" && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Assign Student to Organization
            </h2>

            {/* Table of Students */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => {
                    // Find the assignment for the student
                    const studentAssignment = assignments.find(
                      (a) => a.student_id === student.id
                    );
                    return (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.first_name} {student.last_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/* Display current department if assigned */}
                          {studentAssignment?.department_name || "Not Assigned"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {/* Change "Assign" to "Change Dept" if already assigned */}
                          {studentAssignment ? (
                            <button
                              onClick={() => {
                                setSelectedStudent(student.id);
                                setSelectedDepartment(studentAssignment.organization_id);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Change Dept
                            </button>
                          ) : (
                            <button
                              onClick={() => setSelectedStudent(student.id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Select Department for Assignment */}
            {selectedStudent && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Select Department for Student Assignment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {departments.map((department) => (
                    <button
                      key={department.id}
                      onClick={() => setSelectedDepartment(department.id)}
                      className={`${
                        selectedDepartment === department.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      } p-4 rounded-md hover:bg-blue-500 hover:text-white`}
                    >
                      {department.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAssignStudent}
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
                >
                  {selectedDepartment ? "Change Dept" : "Assign Student"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
