import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.userValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/me',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  UserControllers.getMe,
);

router.patch(
  '/update-my-profile',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateMyProfile,
);

export const UserRouters = router;
