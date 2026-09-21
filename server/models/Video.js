import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    thumbnail: { type: String }, // optional poster image shown before playback
    // Validated against active Category(type: 'gallery') docs in the
    // controller — videos share the same place/theme taxonomy as photos.
    category: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', videoSchema);

export default Video;
