import express from 'express';
import accessRouter from './access';
import { apiKey, permission } from '~/auth/checkAuth';

const router = express.Router();

// Check api key
router.use(apiKey);
// check permission
router.use(permission('0000'))

router.use('/v1/api', accessRouter)

export default router;