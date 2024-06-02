import { Router } from 'express';
import { SaleControllers } from './sale.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-sale',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  SaleControllers.createSale,
);
router.get(
  '/',
  auth(USER_ROLE.Manager, USER_ROLE.User),
  SaleControllers.getAllSales,
);

export const SaleRoutes = router;
