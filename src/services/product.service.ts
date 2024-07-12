import mongoose, { Schema } from "mongoose";
import { BadRequestError } from "~/core/error.response";
import { IProduct } from "~/models/interfaces/product.interface";
import { clothingModel, electronicModel, productModel } from "~/models/product.model";
import { findAll, publishProductByShop, searchProductByUser, unPublishProductByShop } from "~/models/repositories/product.repo";

class ProductFactory {
  public static createProduct(type: string, payload: any) {
    switch (type) {
      case 'Electronics':
        return new Electronics(payload).createProduct();
      case 'Clothing':
        return new Clothing(payload).createProduct();
      default:
        throw new BadRequestError(`Invalid product type ${type}`)
    }
  }

  public static async publishProductByShop({ product_shop, product_id }: { product_shop: string, product_id: string }) {
    return await publishProductByShop({ product_shop, product_id })
  }

  public static async unPublishProductByShop({ product_shop, product_id }: { product_shop: string, product_id: string }) {
    return await unPublishProductByShop({ product_shop, product_id })
  }

  // Query
  public static async findAllDraftsForShop(
    { product_shop, limit = 50, skip = 0 }:
      { product_shop: string, limit?: number, skip?: number }) {
    const query = { product_shop, isDraft: true };
    return await findAll({ query, limit, skip });
  }

  public static async findAllPublishForShop(
    { product_shop, limit = 50, skip = 0 }:
      { product_shop: string, limit?: number, skip?: number }) {
    const query = { product_shop, isPublish: true };
    return await findAll({ query, limit, skip });
  }

  public static async searchProducts({ keySearch }: { keySearch: string }) {
    return await searchProductByUser({ keySearch })
  }
}

class Product {
  public product_name: string;
  public product_thumb: string;
  public product_description: string;
  public product_price: number;
  public product_quantity: number;
  public product_type: string;
  public product_shop: Schema.Types.ObjectId;
  public product_attribute: any;


  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attribute }: IProduct) {
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_quantity = product_quantity
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attribute = product_attribute
  }

  public async createProduct(product_id: mongoose.Types.ObjectId) {
    return await productModel.create({ ...this, _id: product_id });
  }
}

// Define subclass for difference product types
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothingModel.create({
      ...this.product_attribute,
      product_shop: this.product_shop
    });

    if (!newClothing) throw new BadRequestError('Create new clothing error');

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError('Create new product error');

    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronicModel.create({
      ...this.product_attribute,
      product_shop: this.product_shop
    });

    if (!newElectronic) throw new BadRequestError('Create new clothing error');

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError('Create new product error');

    return newProduct;
  }
}

export default ProductFactory;