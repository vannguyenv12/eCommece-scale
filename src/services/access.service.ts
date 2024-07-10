import shopModel from "~/models/shop.model"
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "~/auth/authUtils";
import { getInfoData } from "~/utils";
import { BadRequestError } from "~/core/error.response";

interface ISignUp {
  name: string;
  email: string;
  password: string;
}

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {
  static signUp = async ({ name, email, password }: ISignUp) => {
    const holderShop = await shopModel.findOne({ email }).lean()
    if (holderShop) {
      throw new BadRequestError('Error: Shop already register');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newShop = await shopModel.create({ name, email, password: hashedPassword, roles: [RoleShop.SHOP] });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString('hex');
      const publicKey = crypto.randomBytes(64).toString('hex');

      console.log({ privateKey, publicKey });
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      })

      if (!keyStore) {
        throw new BadRequestError('keyStore error');
      }


      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);
      console.log(`Created Token: `, tokens);

      return {
        code: 201,
        metadata: {
          shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
          tokens
        }
      }
    }

    return {
      code: 201,
      metadata: null
    }


  }

}

export default AccessService