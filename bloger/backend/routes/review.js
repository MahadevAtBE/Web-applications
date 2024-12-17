import express from 'express';
import Feedback from '../schema/feedbackSchema.js' // schema

const review = express.Router();

review.get('/', async (req, res) => {
  try {
    const reviews = await Feedback.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

review.post('/', async (req, res) => {
  const { name, email, message, company } = req.body;

  if (!name || !email || !message || !company) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const reviews = new Feedback({ name, email, message, company });

  try {
    await reviews.save();
    res.status(201).json({ message: 'Message added' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default review;
