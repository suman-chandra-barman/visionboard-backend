import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  //check email is exists
  const isExistEmail = await User.findOne({
    email: payload.email,
  });
  if (isExistEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Email is already exists!');
  }

  //hash password
  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.saltRounds),
  );
  if (hashPassword) {
    payload.password = hashPassword;
  }

  //create user
  const result = await User.create(payload);
  const { password, ...withOutPassword } = result.toJSON();
  return withOutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({ isDeleted: false }).select(
    '-password -__v -createdAt -updatedAt',
  );
  return result;
}

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateMyProfileIntoDB = async (
  user: JwtPayload,
  payload: Partial<TUser>,
) => {
  const { name, ...remainingData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, values] of Object.entries(name)) {
      modifiedUpdatedData[`name.${keys}`] = values;
    }
  }

  const result = await User.findOneAndUpdate(
    { _id: user.userId, isDeleted: false },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getMeFromDB,
  updateMyProfileIntoDB,
};
