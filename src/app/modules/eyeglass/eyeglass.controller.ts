import { Request, Response } from 'express';
import { EyeglassServices } from './eyeglass.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createEyeglass = catchAsync(async (req: Request, res: Response) => {
  const eyeglass = req.body;
  const user = req.user;
  const filePath = req?.file?.path as string;
  const result = await EyeglassServices.createEyeglassIntoDB(
    filePath,
    user,
    eyeglass,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglass created successfully',
    data: result,
  });
});

const getAllEyeglasses = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await EyeglassServices.getAllEyeglassesFromDB(req.query, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglasses retrieved successfully',
    data: result,
  });
});

const getSingleEyeglass = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EyeglassServices.getSingleEyeglassFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglass retrieved successfully',
    data: result,
  });
});

const updateEyeglass = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const filePath = req?.file?.path as string;

  const result = await EyeglassServices.updateEyeglassIntoDB(
    id,
    filePath,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglass updated successfully',
    data: result,
  });
});

const deleteEyeglass = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EyeglassServices.deleteEyeglassFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglass deleted successfully',
    data: result,
  });
});

const deleteManyEyeglasses = catchAsync(async (req: Request, res: Response) => {
  const result = await EyeglassServices.deleteManyEyeglassesFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Eyeglasses are deleted successfully',
    data: result,
  });
});
export const EyeglassControllers = {
  createEyeglass,
  getAllEyeglasses,
  getSingleEyeglass,
  updateEyeglass,
  deleteEyeglass,
  deleteManyEyeglasses,
};
