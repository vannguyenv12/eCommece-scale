import mongoose, { Schema } from "mongoose";
import { IShop } from "./interfaces/shop.interface";

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

const shopSchema = new mongoose.Schema<IShop>({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

//Export the model
const shopModel = mongoose.model(DOCUMENT_NAME, shopSchema);
export default shopModel