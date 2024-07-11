import express from 'express';
import { authentication } from '~/auth/authUtils';
import { accessController } from '~/controllers/access.controller';
import { asyncHandler } from '~/helpers/asyncHandler';

const accessRouter = express.Router();

// Sign Up
accessRouter.post('/shop/signup', asyncHandler(accessController.signUp))
accessRouter.post('/shop/login', asyncHandler(accessController.login))


// Authentication
accessRouter.use(authentication);
accessRouter.post('/shop/logout', asyncHandler(accessController.logout))
accessRouter.post('/shop/handleRefreshToken', asyncHandler(accessController.handleRefreshToken))


export default accessRouter;