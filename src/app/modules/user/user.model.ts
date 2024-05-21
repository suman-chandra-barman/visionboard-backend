import { Schema, model } from 'mongoose';
import { TName, TUser } from './user.interface';

const nameSchema = new Schema<TName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<TUser>(
  {
    name: {
      type: nameSchema,
      required: true,
    },
    profileImage: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ['Manager', 'User'],
      default: 'User',
    },
    address: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
