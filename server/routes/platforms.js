import express from 'express';
import CodingPlatform from '../models/CodingPlatform.js';

const router = express.Router();

// GET all platforms
router.get('/', async (req, res) => {
  try {
    const platforms = await CodingPlatform.find().sort({ createdAt: -1 });
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single platform
router.get('/:id', async (req, res) => {
  try {
    const platform = await CodingPlatform.findById(req.params.id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    res.json(platform);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE platform
router.post('/', async (req, res) => {
  try {
    const platform = new CodingPlatform(req.body);
    const savedPlatform = await platform.save();
    res.status(201).json(savedPlatform);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE platform
router.put('/:id', async (req, res) => {
  try {
    const platform = await CodingPlatform.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    res.json(platform);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE platform
router.delete('/:id', async (req, res) => {
  try {
    const platform = await CodingPlatform.findByIdAndDelete(req.params.id);
    if (!platform) return res.status(404).json({ error: 'Platform not found' });
    res.json({ message: 'Platform deleted', platform });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
