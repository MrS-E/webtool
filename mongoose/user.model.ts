import * as mongoose from 'mongoose';

export default mongoose.model(
  'user',
  new mongoose.Schema(
    {
      _id: { type: mongoose.Types.ObjectId, required: true },
      firstname: { type: String, required: true, match: /[A-Za-z]/gi },
      lastname: { type: String, required: true, match: /[A-Za-z]/gi },
      email: { type: String, unique: true, required: true },
      auth: { type: String, required: true, min: 8 },
      passwords: { type: [mongoose.Types.ObjectId] },
      notes: { type: [mongoose.Types.ObjectId] },
      token: { type: [mongoose.Types.ObjectId] },
    },
    {
      timestamps: true,
      collection: 'user',
    },
  ),
);
