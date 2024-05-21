import { Request, Response } from 'express';
import { SaleServices } from './sale.service';

const createSale = async (req: Request, res: Response) => {
  try {
    const sale = req.body;
    const result = await SaleServices.createSaleIntoDB(sale);

    res.status(200).json({
      success: true,
      message: 'Product is sale successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to sale  product',
    });
  }
};

const getAllSales = async (req: Request, res: Response) => {
  try {
    const result = await SaleServices.getAllSalesFromDB(req.query);

    res.status(200).json({
      success: true,
      message: 'Sales product are retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieved sales product',
    });
  }
};

export const SaleControllers = {
  createSale,
  getAllSales,
};
