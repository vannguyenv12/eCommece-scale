import shopModel from "~/models/shop.model"
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenService from "./keyToken.service";
import { createTokenPair } from "~/auth/authUtils";
import { getInfoData } from "~/utils";

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
    try {
      const holderShop = await shopModel.findOne({ email }).lean()
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered!'
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({ name, email, password: hashedPassword, roles: [RoleShop.SHOP] });

      if (newShop) {
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   }
        // });

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        console.log({ privateKey, publicKey });
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        })

        if (!keyStore) {
          return {
            code: 'xxxx',
            message: 'keyStore error'
          }
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

    } catch (error: any) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }

}

export default AccessService