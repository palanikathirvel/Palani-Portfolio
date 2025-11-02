import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: String,
    description: String,
    logo: String, // Base64 encoded logo
    startDate: Date,
    endDate: Date,
    isCurrently: { type: Boolean, default: false },
    technologies: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Internship', internshipSchema);
