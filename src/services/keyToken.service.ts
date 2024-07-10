import mongoose from "mongoose";
import keyTokenModel from "~/models/keytoken.model";

interface IKeyToken {
  userId: mongoose.Types.ObjectId;
  publicKey: string;
  privateKey: string;
}

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }: IKeyToken) => {
    try {
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey,
        privateKey
      })

      return tokens ? tokens.publicKey : null;
    } catch (error) {

    }
  }
}

export default KeyTokenService;