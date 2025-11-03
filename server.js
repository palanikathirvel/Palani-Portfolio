import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
let mongoConnected = false;

const connectDB = async () => {
    if (mongoConnected) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
        mongoConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Import routes
import projectRoutes from './server/routes/projects.js';
import skillRoutes from './server/routes/skills.js';
import achievementRoutes from './server/routes/achievements.js';
import internshipRoutes from './server/routes/internships.js';
import platformRoutes from './server/routes/platforms.js';
import socialLinkRoutes from './server/routes/socialLinks.js';
import profileRoutes from './server/routes/profile.js';

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/profile', profileRoutes);

// Root endpoint
app.get('/', async (req, res) => {
    await connectDB();
    res.json({ message: 'Portfolio Backend API is running', endpoints: {
        health: '/api/health',
        projects: '/api/projects',
        skills: '/api/skills',
        achievements: '/api/achievements',
        internships: '/api/internships',
        platforms: '/api/platforms',
        socialLinks: '/api/social-links',
        profile: '/api/profile'
    } });
});

// Health check
app.get('/api/health', async (req, res) => {
    await connectDB();
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found', message: `Route ${req.path} not found` });
});

// Export for Vercel serverless function
export default app;

// Local development server
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
