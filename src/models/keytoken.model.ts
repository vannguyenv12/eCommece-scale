
import mongoose, { Schema } from "mongoose";
import { IKeyToken } from "./interfaces/keytoken.interface";
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema<IKeyToken>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  privateKey: {
    type: String, required: true,
  },
  publicKey: {
    type: String, required: true,
  },
  refreshTokensUsed: {
    type: Array,
    default: []
  },
  refreshToken: {
    type: String, required: true,
  },
}, {
  collection: COLLECTION_NAME,
  timestamps: true
});

//Export the model
const keyTokenModel = mongoose.model(DOCUMENT_NAME, keyTokenSchema);
export default keyTokenModel;