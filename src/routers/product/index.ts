import express from 'express';
import { authentication } from '~/auth/authUtils';
import { productController } from '~/controllers/product.controller';
import { asyncHandler } from '~/helpers/asyncHandler';

const productRouter = express.Router();

productRouter.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))
productRouter.get('/', asyncHandler(productController.findAllProducts))
productRouter.get('/:productId', asyncHandler(productController.findProduct))

// Authentication
productRouter.use(authentication);
productRouter.post('/publish/:id', asyncHandler(productController.publishProductByShop))
productRouter.post('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))


// Sign Up
productRouter.post('/', asyncHandler(productController.createNewProduct))
productRouter.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
productRouter.get('/published/all', asyncHandler(productController.getAllPublishForShop))

export default productRouter;