import crypto from 'node:crypto';
import apiKeyModel from "~/models/apikey.model"

export const findById = async (key: any) => {
  // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000'] });
  // console.log(newKey)

  const objKey = await apiKeyModel.findOne({ key, status: true }).lean();
  return objKey;

}