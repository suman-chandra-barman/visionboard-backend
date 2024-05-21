import { Types } from 'mongoose';

export type TEyeglass = {
  name: string;
  user: Types.ObjectId;
  price: number;
  brand: string;
  quantity: number;
  image: string;
  frameMaterial: string;
  frameShape: string;
  lensType: string;
  gender: 'Male' | 'Female' | 'Unisex' | 'Kids';
  color: string;
  templeLength: number;
  bridgeSize: number;
  availability: boolean;
  isDeleted: boolean;
};
