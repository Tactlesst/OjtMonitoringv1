// pages/api/verify-token.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({ success: true, user: decoded });
    } catch (err) {
      res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
