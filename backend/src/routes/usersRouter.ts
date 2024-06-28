import { Router } from 'express';
import { clearData, getUsers } from '../controllers/fileController';

const router = Router();

router.get('/users', getUsers);
router.delete('/clear', clearData);

export default router;
