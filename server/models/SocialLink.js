import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: String,
  icon: String, // Base64 encoded icon or icon name
  label: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('SocialLink', socialLinkSchema);
