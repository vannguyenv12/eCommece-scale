import mongoose, { Types } from "mongoose";
import keyTokenModel from "~/models/keytoken.model";

interface IKeyToken {
  userId: mongoose.Types.ObjectId;
  publicKey: string;
  privateKey: string;
  refreshToken: string;
}

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }: IKeyToken) => {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })

      // return tokens ? tokens.publicKey : null;

      const filter = {
        user: userId
      }, update = {
        publicKey, privateKey, refreshTokenUsed: [], refreshToken
      }, options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

      return tokens ? tokens.publicKey : null;

    } catch (error) {
      return error;
    }
  }

  static findByUserId = async (userId: string) => {
    return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) });
  }

  static removeKeyById = async (id: Types.ObjectId) => {
    return await keyTokenModel.deleteOne({ _id: id });
  }

  static findByRefreshTokenUsed = async (refreshToken: string) => {
    return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  }

  static findByRefreshToken = async (refreshToken: string) => {
    return await keyTokenModel.findOne({ refreshToken });
  }

  static deleteKeyById = async (userId: string) => {
    return await keyTokenModel.deleteOne({ user: userId })
  }


}

export default KeyTokenService;