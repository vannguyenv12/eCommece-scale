import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interfaces/product.interface";
import slugify from "slugify";

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new mongoose.Schema<IProduct>({
  product_name: { type: String, required: true },
  product_thumb: { type: String, required: true },
  product_description: String,
  product_slug: String,
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, required: true },
  product_type: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
  product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  product_attribute: { type: Schema.Types.Mixed, required: true },
  product_ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val: number) => Math.round(val * 10) / 10
  },
  product_variations: { type: Array, default: [] },
  isDraft: { type: Boolean, default: true, index: true, select: false },
  isPublished: { type: Boolean, default: false, index: true, select: false },
}, {
  collection: COLLECTION_NAME,
  timestamps: true,
});
productSchema.index({ product_name: 'text', product_description: 'text' });

// Document middleware
productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
})

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
