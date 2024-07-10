import mongoose from "mongoose";
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

      return tokens;

    } catch (error) {

    }
  }
}

export default KeyTokenService;