import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
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

const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateMyProfileIntoDB = async (
  user: JwtPayload,
  filePath: string,
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

  //set user image using cloudinary
  if (filePath) {
    const imageName = `${payload.name}_${payload?.role}`;
    const imgFile: any = await sendImageToCloudinary(imageName, filePath);
    modifiedUpdatedData.profileImage = imgFile?.secure_url;
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
  getMeFromDB,
  updateMyProfileIntoDB,
};
