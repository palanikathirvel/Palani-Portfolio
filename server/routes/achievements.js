import express from 'express';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE achievement
router.post('/', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE achievement
router.put('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE achievement
router.delete('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.json({ message: 'Achievement deleted', achievement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
