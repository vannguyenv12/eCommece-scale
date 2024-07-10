import express from 'express';
import { asyncHandler } from '~/auth/checkAuth';
import { accessController } from '~/controllers/access.controller';

const accessRouter = express.Router();

// Sign Up
accessRouter.post('/shop/signup', asyncHandler(accessController.signUp))

export default accessRouter;