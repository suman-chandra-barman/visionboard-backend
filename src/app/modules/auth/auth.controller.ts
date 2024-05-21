import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.userLogin(req.body);

  res.cookie('refreshToken', result.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successful!',
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const AuthControllers = {
  userLogin,
};
