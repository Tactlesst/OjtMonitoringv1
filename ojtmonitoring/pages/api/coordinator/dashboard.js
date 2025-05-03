import db from '@/lib/db';

export default async function handler(req, res) {
    try {
        // Get total students
        const [students] = await db.execute('SELECT COUNT(*) AS total FROM users WHERE role = "student" AND disabled = 0');

        // Get active organizations
        const [activeOrganizations] = await db.execute('SELECT COUNT(*) AS activeOrganizations FROM organizations WHERE contact_email IS NOT NULL');

        // Get completed OJT
        const [completedOjt] = await db.execute('SELECT COUNT(*) AS completedOjt FROM organizations WHERE contact_email IS NOT NULL AND contact_phone IS NOT NULL');

        // Get student progress (excluding hours_completed, total_hours, and status)
        const [progressData] = await db.execute(`
            SELECT 
                u.first_name, u.last_name, o.name AS company
            FROM users u
            JOIN student_organization_assignments sa ON u.id = sa.student_id
            JOIN organizations o ON sa.organization_id = o.id
            WHERE u.role = 'student' AND u.disabled = 0
        `);

        res.status(200).json({
            totalStudents: students[0].total,
            activeOrganizations: activeOrganizations[0].activeOrganizations,
            completedOjt: completedOjt[0].completedOjt,
            progressData: progressData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
