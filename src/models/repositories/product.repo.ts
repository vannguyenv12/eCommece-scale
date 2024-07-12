import mongoose from "mongoose";
import { productModel } from "../product.model"

export const findAll = async ({ query, limit, skip }: { query: any, limit: number, skip: number }) => {
  return await productModel.find(query).populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
}

export const searchProductByUser = async ({ keySearch }: { keySearch: string }) => {
  const regexSearch = new RegExp(keySearch);
  const results = await productModel.find({
    isPublished: true,
    // @ts-ignore
    $text: { $search: regexSearch }
  },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } }).lean()

  return results;
}


export const publishProductByShop = async ({ product_shop, product_id }: { product_shop: string, product_id: string }) => {
  const foundShop = await productModel.findOne({
    product_shop: new mongoose.Types.ObjectId(product_shop),
    _id: new mongoose.Types.ObjectId(product_id)
  })

  if (!foundShop) return null;

  foundShop.isDraft = false;
  foundShop.isPublished = true;

  const { modifiedCount } = await foundShop.updateOne(foundShop);

  return modifiedCount;
}

export const unPublishProductByShop = async ({ product_shop, product_id }: { product_shop: string, product_id: string }) => {
  const foundShop = await productModel.findOne({
    product_shop: new mongoose.Types.ObjectId(product_shop),
    _id: new mongoose.Types.ObjectId(product_id)
  })

  if (!foundShop) return null;

  foundShop.isDraft = true;
  foundShop.isPublished = false;

  const { modifiedCount } = await foundShop.updateOne(foundShop);

  return modifiedCount;
}