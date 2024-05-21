import { USER_ROLE } from './user.constant';

export type TName = {
  firstName: string;
  lastName: string;
};

export type TUser = {
  name: TName;
  profileImage?: string;
  email: string;
  password: string;
  age: number;
  role: 'User' | 'Manager';
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  contactNo: string;
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
