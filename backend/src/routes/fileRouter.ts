import { Router } from 'express';
import { uploadFile } from '../controllers/fileController';

const router = Router();

router.post('/files', uploadFile);

export default router;
