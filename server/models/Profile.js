import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  photo: String, // Base64 encoded photo
  email: String,
  phone: String,
  location: String,
  bio: String,
  resume: String, // Can be Base64 encoded PDF or URL
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Profile', profileSchema);
