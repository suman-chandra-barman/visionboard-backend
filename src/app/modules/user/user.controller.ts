import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUserIntoDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user;
  const result = await UserServices.getMeFromDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = req.body;
  const filePath = req?.file?.path as string;

  const result = await UserServices.updateMyProfileIntoDB(user, filePath, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
  updateMyProfile,
};
