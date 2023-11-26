import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getSingleUser)
router.put('/:userId', UserController.updateData)
router.delete('/:userId', UserController.deleteUserById)

export const UserRoutes = router;