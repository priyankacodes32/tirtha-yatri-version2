import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'booking',
        'payment',
        'travel-documents',
        'muktinath-travel',
        'accommodation',
        'transportation',
        'health-altitude',
        'cancellation',
      ],
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
