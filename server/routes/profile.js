import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// GET profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE/UPDATE profile
router.post('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
    } else {
      // Create new profile
      profile = new Profile(req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
