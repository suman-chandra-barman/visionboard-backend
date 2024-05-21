import { Types } from 'mongoose';

export type TSale = {
  productId: Types.ObjectId;
  buyerName: string;
  quantity: number;
  date: Date;
};
