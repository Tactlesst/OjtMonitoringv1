import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await db.query(`
        SELECT 
          soa.student_id,
          soa.organization_id,
          soa.assigned_at,
          u.first_name,
          u.last_name,
          o.name AS department_name
        FROM student_organization_assignments soa
        JOIN users u ON soa.student_id = u.id
        JOIN organizations o ON soa.organization_id = o.id
      `);

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
