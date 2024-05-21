import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AuthRouters } from '../modules/auth/auth.route';
import { EyeglassRoutes } from '../modules/eyeglass/eyeglass.route';
import { SaleRoutes } from '../modules/sale/sale.route';

const router = Router();

router.use('/auth', AuthRouters);
router.use('/users', UserRouters);
router.use('/eyeglasses', EyeglassRoutes);
router.use('/sales', SaleRoutes);

export default router;
