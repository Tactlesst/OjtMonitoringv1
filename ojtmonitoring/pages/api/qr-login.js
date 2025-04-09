// pages/api/qr-login.js
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../lib/db'; // Assuming you have a db.js file

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // You should set this in .env.local

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection('users'); // Assuming you're using MongoDB or a similar DB

    // Check if the user exists and the password is correct
    const user = await collection.findOne({ email });

    if (user && user.password === password) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } // Expiration time
      );

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
