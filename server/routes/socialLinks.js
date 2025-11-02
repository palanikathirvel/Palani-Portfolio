import express from 'express';
import SocialLink from '../models/SocialLink.js';

const router = express.Router();

// GET all social links
router.get('/', async (req, res) => {
  try {
    const socialLinks = await SocialLink.find().sort({ createdAt: -1 });
    res.json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single social link
router.get('/:id', async (req, res) => {
  try {
    const socialLink = await SocialLink.findById(req.params.id);
    if (!socialLink) return res.status(404).json({ error: 'Social link not found' });
    res.json(socialLink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE social link
router.post('/', async (req, res) => {
  try {
    const socialLink = new SocialLink(req.body);
    const savedLink = await socialLink.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE social link
router.put('/:id', async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    if (!socialLink) return res.status(404).json({ error: 'Social link not found' });
    res.json(socialLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE social link
router.delete('/:id', async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndDelete(req.params.id);
    if (!socialLink) return res.status(404).json({ error: 'Social link not found' });
    res.json({ message: 'Social link deleted', socialLink });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
