const ProgressData = require('../models/progress.model');

// Get progress data by email and type
async function getProgressData(req, res) {
  const { email, type } = req.query;

  if (!email || !type) {
    return res.status(400).json({ message: 'Email and type are required' });
  }

  try {
    const data = await ProgressData.find({ email, type });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}

// Add progress data
async function addProgressData(req, res) {
  const { email, type, month, count } = req.body;

  if (!email || !type || !month || count === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newData = new ProgressData({ email, type, month, count });
    await newData.save();
    res.status(201).json({ message: 'Data added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data', error: error.message });
  }
}
// Increment progress count or create a new record
async function incrementProgressData(req, res) {
    const { email, type, month } = req.body;
  
    if (!email || !type || !month) {
      return res.status(400).json({ message: 'Email, type, and month are required' });
    }
  
    try {
      // Find the record by email, type, and month
      let data = await ProgressData.findOne({ email, type, month });
  
      if (data) {
        // If it exists, increment the count
        data.count += 1;
        await data.save();
        res.status(200).json({ message: 'Progress count incremented', data });
      } else {
        // If it doesn't exist, create a new record with count = 1
        data = new ProgressData({ email, type, month, count: 1 });
        await data.save();
        res.status(201).json({ message: 'Progress data created', data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error processing data', error: error.message });
    }
  }

module.exports = {
  getProgressData,
  addProgressData,
  incrementProgressData,
};
