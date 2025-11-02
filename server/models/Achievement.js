import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    badge: String, // Base64 encoded badge image
    date: Date,
    category: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Achievement', achievementSchema);
