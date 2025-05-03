import db from '@/lib/db'; // Import db connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { student_id, organization_id } = req.body;

    // Validate input data (simple validation)
    if (!student_id || !organization_id) {
      return res.status(400).json({ error: 'Student ID and Organization ID are required.' });
    }

    try {
      console.log("Assigning student", { student_id, organization_id }); // Log the data

      // Insert the student-organization assignment into the database
      const result = await db.query(
        'INSERT INTO student_organization_assignments (student_id, organization_id) VALUES (?, ?)',
        [student_id, organization_id]
      );

      // Check if insertion was successful
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Student assigned to department successfully' });
      } else {
        // This can happen if there are issues like duplicate entries, or something went wrong
        return res.status(400).json({ error: 'Student might already be assigned to this department or an issue occurred.' });
      }
    } catch (err) {
      console.error('Error while assigning student to department:', err); // More detailed logging
      return res.status(500).json({ error: 'Failed to assign student to department.' });
    }
  } else if (req.method === 'GET') {
    try {
      // Corrected query to use `users` table for student data
      const query = `
        SELECT sao.student_id, u.first_name, u.last_name, o.name AS department_name, sao.organization_id
        FROM student_organization_assignments sao
        JOIN users u ON sao.student_id = u.id
        JOIN organizations o ON sao.organization_id = o.id
        WHERE u.role = 'student'
      `;

      const [assignments] = await db.query(query);

      // Return the assignments data with student names and department name
      res.status(200).json(assignments);
    } catch (err) {
      console.error('Error while fetching assignments:', err);
      return res.status(500).json({ error: 'Failed to fetch assignments.' });
    }
  } else {
    // Handle non-POST methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
