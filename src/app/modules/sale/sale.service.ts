import mongoose from 'mongoose';
import { Eyeglass } from '../eyeglass/eyeglass.model';
import { TSale } from './sale.interface';
import { Sale } from './sale.model';

const createSaleIntoDB = async (payload: TSale) => {
  const productId = payload.productId;
  const productQuantity = await Eyeglass.findById(productId).select('quantity');

  if (!productQuantity) {
    throw new Error('Selling product not found');
  }

  // check if the sale product quantity is greater than to exist product
  if (productQuantity?.quantity < payload.quantity) {
    throw new Error('Selling product cannot be more than available product');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // check if the product quantity and sell quantity is equal
    const quantity = productQuantity?.quantity - payload.quantity;
    if (quantity === 0) {
      const deleteEyeglass = await Eyeglass.findByIdAndUpdate(
        productId,
        { quantity, isDeleted: true },
        { new: true, session },
      );
      if (!deleteEyeglass) {
        throw new Error('Failed to delete eyeglass');
      }
    } else {
      const updatedEyeglass = await Eyeglass.findByIdAndUpdate(
        productId,
        { quantity },
        { new: true, session },
      );
      if (!updatedEyeglass) {
        throw new Error('Failed to update eyeglass');
      }
    }

    const result = await Sale.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const historyDays = Number(query.history);

  if (isNaN(historyDays) || historyDays <= 0) {
    const allProducts = await Sale.find().populate('productId');
    return allProducts;
  }

  const presentDate = new Date();

  const earliestDate = new Date(presentDate);
  earliestDate.setDate(earliestDate.getDate() - historyDays);

  const products = await Sale.find({
    date: { $gte: earliestDate },
  }).populate('productId');

  return products;
};

export const SaleServices = {
  createSaleIntoDB,
  getAllSalesFromDB,
};
