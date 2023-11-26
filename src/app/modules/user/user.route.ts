import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateData);
router.delete('/:userId', UserController.deleteUserById);
router.put('/:userId/orders', UserController.addProduct);
router.get('/:userId/orders', UserController.getSingleUserOrder);
router.get(
  '/:userId/orders/total-price',
  UserController.totalPriceOfSingleUser,
);

export const UserRoutes = router;
