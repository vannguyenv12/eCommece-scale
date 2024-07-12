import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interfaces/product.interface";

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new mongoose.Schema<IProduct>({
  product_name: { type: String, required: true },
  product_thumb: { type: String, required: true },
  product_description: String,
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, required: true },
  product_type: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  product_attribute: { type: Schema.Types.Mixed, required: true },
}, {
  collection: COLLECTION_NAME,
  timestamps: true,
});

// Define product type
const clothingSchema = new Schema({
  brand: { type: String, required: true },
  size: String,
  material: String
}, {
  collection: 'clothes',
  timestamps: true
})

// Define product electronic
const electronicSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: String,
  color: String
}, {
  collection: 'electronics',
  timestamps: true
})

//Export the model
export const productModel = mongoose.model(DOCUMENT_NAME, productSchema);
export const clothingModel = mongoose.model('Clothing', clothingSchema);
export const electronicModel = mongoose.model('Electronics', electronicSchema);
