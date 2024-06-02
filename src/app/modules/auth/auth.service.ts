import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';

const userLogin = async (payload: TUserLogin) => {
  const user = await User.findOne({
    email: payload.email,
    isDeleted: false,
  }).select('+password');

  //if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Email');
  }

  //check password is valid
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wrong password!');
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
