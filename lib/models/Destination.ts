import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stats: {
      averageEarnings: { type: String, default: '' },
      costOfLiving: { type: String, default: '' },
      visaType: { type: String, default: '' },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);

export default Destination;