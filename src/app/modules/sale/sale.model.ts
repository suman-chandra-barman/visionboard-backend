import { Schema, model } from 'mongoose';
import { TSale } from './sale.interface';

const saleSchema = new Schema<TSale>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Eyeglass',
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Sale = model<TSale>('Sale', saleSchema);
