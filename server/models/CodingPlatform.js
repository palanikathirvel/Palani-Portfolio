import mongoose from 'mongoose';

const codingPlatformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: String,
  icon: String, // Base64 encoded icon or icon name
  handle: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('CodingPlatform', codingPlatformSchema);
