import express from 'express';
import { authentication } from '~/auth/authUtils';
import { productController } from '~/controllers/product.controller';
import { asyncHandler } from '~/helpers/asyncHandler';

const productRouter = express.Router();

// Authentication
productRouter.use(authentication);

// Sign Up
productRouter.post('/', asyncHandler(productController.createNewProduct))

export default productRouter;