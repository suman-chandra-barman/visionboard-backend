import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TEyeglass } from './eyeglass.interface';
import { Eyeglass } from './eyeglass.model';
import { JwtPayload } from 'jsonwebtoken';
import { eyeglassSearchableFields } from './eyeglass.constant';

const createEyeglassIntoDB = async (
  userInfo: JwtPayload,
  payload: TEyeglass,
) => {
  //set user
  payload.user = userInfo.userId;

  const result = await Eyeglass.create(payload);
  return result;
};

const getAllEyeglassesFromDB = async (
  query: Record<string, unknown>,
  userInfo: JwtPayload,
) => {
  const eyeglassQuery = new QueryBuilder(
    Eyeglass.find({ isDeleted: false }).sort({ createdAt: -1 }),
    query,
  )
    .getByUserRole(userInfo)
    .search(eyeglassSearchableFields)
    .filterByFrameMaterial()
    .filterByFrameShape()
    .filterByLensType()
    .filterByBrand();

  const result = await eyeglassQuery.modelQuery;
  return result;
};

const getSingleEyeglassFromDB = async (id: string) => {
  const result = await Eyeglass.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Eyeglass not found');
  }

  return result;
};

const updateEyeglassIntoDB = async (
  id: string,
  payload: Partial<TEyeglass>,
) => {
  const result = await Eyeglass.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      new: true,
    },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Eyeglass not found');
  }

  return result;
};

const deleteEyeglassFromDB = async (id: string) => {
  const result = await Eyeglass.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Eyeglass not found');
  }
  return result;
};

const deleteManyEyeglassesFromDB = async (payload: { ids: string[] }) => {
  const result = await Eyeglass.deleteMany({ _id: { $in: payload.ids } });
  return result;
};

export const EyeglassServices = {
  createEyeglassIntoDB,
  getAllEyeglassesFromDB,
  getSingleEyeglassFromDB,
  updateEyeglassIntoDB,
  deleteEyeglassFromDB,
  deleteManyEyeglassesFromDB,
};
