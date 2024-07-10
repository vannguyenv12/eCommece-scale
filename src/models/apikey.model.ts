import mongoose from "mongoose";

const DOCUMENT_NAME = 'ApiKey';
const COLLECTION_NAME = 'ApiKeys';

var apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  permissions: {
    type: [String],
    required: true,
    enum: ['0000', '1111', '2222']
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

const apiKeyModel = mongoose.model(DOCUMENT_NAME, apiKeySchema);
export default apiKeyModel