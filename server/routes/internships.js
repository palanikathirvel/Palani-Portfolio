import express from 'express';
import Internship from '../models/Internship.js';

const router = express.Router();

// GET all internships
router.get('/', async (req, res) => {
    try {
        const internships = await Internship.find().sort({ createdAt: -1 });
        res.json(internships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single internship
router.get('/:id', async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ error: 'Internship not found' });
        res.json(internship);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE internship
router.post('/', async (req, res) => {
    try {
        const internship = new Internship(req.body);
        const savedInternship = await internship.save();
        res.status(201).json(savedInternship);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE internship
router.put('/:id', async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        if (!internship) return res.status(404).json({ error: 'Internship not found' });
        res.json(internship);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE internship
router.delete('/:id', async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) return res.status(404).json({ error: 'Internship not found' });
        res.json({ message: 'Internship deleted', internship });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
