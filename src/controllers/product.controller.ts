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

}

export const productController: ProductController = new ProductController();