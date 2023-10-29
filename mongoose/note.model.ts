import * as mongoose from 'mongoose';

export default mongoose.model(
  'note',
  new mongoose.Schema(
    {
      _id: { type: mongoose.Types.ObjectId, required: true },
      name: { type: String, required: true },
      description: { type: String },
      user: { type: mongoose.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
      collection: 'note',
    },
  ),
);
