import shopModel from "~/models/shop.model"
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import KeyTokenService from "./keyToken.service";
import { createTokenPair, verifyJWT } from "~/auth/authUtils";
import { getInfoData } from "~/utils";
import { AuthFailureError, BadRequestError, ForbiddenError } from "~/core/error.response";
import { findByEmail } from "./shop.service";
import { IKeyToken, IKeyTokenDocument } from "~/models/interfaces/keytoken.interface";

interface ISignUp {
  name: string;
  email: string;
  password: string;
}

interface ISignIn {
  email: string;
  password: string;
  refreshToken: string | null;
}

interface IHandleRefreshToken {
  keyStore: IKeyTokenDocument, user: AuthPayload, refreshToken: string;
}

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {

  static handleRefreshToken = async ({ keyStore, user, refreshToken }: IHandleRefreshToken) => {
    const { email, userId } = user;
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError('Something went wrong! Please login again')
    }

    if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError('Shop not registered!');

    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError('Shop not registered!');

    const tokens = await createTokenPair({ userId: foundShop._id, email }, keyStore.publicKey, keyStore.privateKey);

    await keyStore.updateOne({
      $set: {
        refreshToken: tokens?.refreshToken
      },
      $addToSet: {
        refreshTokensUsed: refreshToken
      }
    });

    return {
      user,
      tokens
    }


  }

  static logout = async ({ keyStore }: { keyStore: IKeyTokenDocument }) => {
    const delKey = await await KeyTokenService.removeKeyById(keyStore._id);
    console.log({ delKey });
    return delKey;
  }

  static login = async ({ email, password, refreshToken = null }: ISignIn) => {
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError('Shop not registered');

    const match = await bcrypt.compare(password, foundShop.password);

    if (!match) throw new AuthFailureError('Authentication error');

    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey);

    if (!tokens) return;

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey, publicKey,
      userId: foundShop._id
    })

    return {
      metadata: {
        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
        tokens
      }
    }
  }

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
        refreshToken: '',
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