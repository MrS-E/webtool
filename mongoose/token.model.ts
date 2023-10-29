import * as mongoose from 'mongoose';

export default mongoose.model(
  'token',
  new mongoose.Schema(
    {
      _id: { type: mongoose.Types.ObjectId, required: true },
      user: { type: mongoose.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
      collection: 'token',
    },
  ),
);
