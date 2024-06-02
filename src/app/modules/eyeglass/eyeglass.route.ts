import { Router } from 'express';
import { EyeglassControllers } from './eyeglass.controller';
import validateRequest from '../../middlewares/validateRequest';
import { EyeglassValidations } from './eyeglass.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = Router();

router.get(
  '/',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  EyeglassControllers.getAllEyeglasses,
);

router.get(
  '/:id',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  EyeglassControllers.getSingleEyeglass,
);

router.post(
  '/create-eyeglass',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  validateRequest(EyeglassValidations.eyeglassValidationSchema),
  EyeglassControllers.createEyeglass,
);

router.patch(
  '/:id',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  validateRequest(EyeglassValidations.updateEyeglassValidationSchema),
  EyeglassControllers.updateEyeglass,
);

router.delete(
  '/:id',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  EyeglassControllers.deleteEyeglass,
);

router.delete(
  '/',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  EyeglassControllers.deleteManyEyeglasses,
);

export const EyeglassRoutes = router;
