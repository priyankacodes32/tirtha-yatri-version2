import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: { type: String, required: true, trim: true },
    address: { type: String },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TourPackage',
      default: null,
    },
    message: { type: String, required: true },
    additionalRequirements: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'converted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
