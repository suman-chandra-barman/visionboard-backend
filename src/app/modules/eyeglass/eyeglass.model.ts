import { Schema, model } from 'mongoose';
import { TEyeglass } from './eyeglass.interface';

const eyeglassSchema = new Schema<TEyeglass>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  frameMaterial: {
    type: String,
    required: true,
  },
  frameShape: {
    type: String,
    required: true,
  },
  lensType: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ['Men', 'Women', 'Unisex', 'Kids'],
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  templeLength: {
    type: Number,
    required: true,
  },
  bridgeSize: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Eyeglass = model<TEyeglass>('Eyeglass', eyeglassSchema);
