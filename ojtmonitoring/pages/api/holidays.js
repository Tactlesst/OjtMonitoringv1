// pages/api/holidays.js
export default async function handler(req, res) {
    const API_KEY = process.env.CALENDARIFIC_API_KEY; // Store in .env.local
    const country = 'PH'; // Philippines
    const year = new Date().getFullYear();
  
    try {
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${country}&year=${year}`
      );
      const data = await response.json();
  
      const holidays = data.response.holidays.map(h => ({
        date: h.date.iso.split('T')[0],
        name: h.name,
        type: h.type,
      }));
  
      res.status(200).json(holidays);
    } catch (error) {
      console.error('Error fetching holidays:', error);
      res.status(500).json({ message: 'Failed to fetch holidays' });
    }
  }
  