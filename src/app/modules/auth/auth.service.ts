import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';

const userLogin = async (payload: TUserLogin) => {
  const user = await User.findOne({
    email: payload.email,
  });

  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // if user deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is already deleted');
  }

  //create access token and refresh token
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  userLogin,
};
