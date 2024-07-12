import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "~/core/success.error";
import ProductFactory from "~/services/product.service";

class ProductController {
  public createNewProduct = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Create new product successfully!',
      metadata: await ProductFactory.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId
      })
    }).send(res);
  }

  public publishProductByShop = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Publish product successfully!',
      metadata: await ProductFactory.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res);
  }

  public unPublishProductByShop = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Publish product successfully!',
      metadata: await ProductFactory.unPublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId
      })
    }).send(res);
  }

  public getAllDraftsForShop = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get list product draft success!',
      metadata: await ProductFactory.findAllDraftsForShop({ product_shop: req.user.userId }),
    }).send(res);
  }

  public getAllPublishForShop = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get list product publish success!',
      metadata: await ProductFactory.findAllPublishForShop({ product_shop: req.user.userId }),
    }).send(res);
  }

  public getListSearchProduct = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get list products success!',
      metadata: await ProductFactory.searchProducts(req.params as { keySearch: string }),
    }).send(res);
  }
}

export const productController: ProductController = new ProductController();