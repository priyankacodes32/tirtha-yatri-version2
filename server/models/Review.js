import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    avatar: { type: String },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    tour: {
      type: String, // free-text name of the tour taken
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    travelDate: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    isFeatured: { type: Boolean, default: false },
    // Marks seed/demo content so it's never confused with a real submitted review.
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
