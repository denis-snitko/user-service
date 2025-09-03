import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { requireAdmin } from '../middlewares/requireRole';
import * as userController from '../controllers/users.controller';

const router = Router();
router.use(auth);

router.get('/:id', userController.getMeOrById);
router.get('/', requireAdmin, userController.list);
router.post('/:id/block', userController.block);

export default router;
