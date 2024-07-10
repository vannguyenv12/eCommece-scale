import express from 'express';
import { accessController } from '~/controllers/access.controller';

const accessRouter = express.Router();

// Sign Up
accessRouter.post('/shop/signup', accessController.signUp)

export default accessRouter;