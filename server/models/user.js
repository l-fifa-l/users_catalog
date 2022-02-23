import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model('User', userSchema);
