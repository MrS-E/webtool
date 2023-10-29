import * as mongoose from 'mongoose';

export default mongoose.model(
  'password',
  new mongoose.Schema(
    {
      _id: { type: mongoose.Types.ObjectId, required: true },
      name: { type: String, required: true },
      email: { type: String },
      username: { type: String },
      telephone: { type: String },
      description: { type: String },
      password: { type: String },
      user: { type: mongoose.Types.ObjectId, required: true },
    },
    {
      timestamps: true,
      collection: 'password',
    },
  ),
);
