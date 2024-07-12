import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { AuthFailureError, NotFoundError } from '~/core/error.response';
import { asyncHandler } from '~/helpers/asyncHandler';
import KeyTokenService from '~/services/keyToken.service';

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'x-rtoken-id'
}


export const createTokenPair = async (payload: any, publicKey: any, privateKey: any) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    });

    JWT.verify(accessToken, publicKey, (err: any, decode: any) => {
      if (err) {
        console.error(`Err verify: ${err}`);
      }
      else {
        console.log(`decode verify:`, decode)
      }
    })

    return { accessToken, refreshToken }

  } catch (error) {

  }
}

export const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID] as string;

  if (!userId) throw new AuthFailureError('Invalid Request');

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFoundError('Not found keystore');

  if (req.headers[HEADER.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESH_TOKEN] as string;
      const decodedUser = JWT.verify(refreshToken, keyStore.privateKey) as AuthPayload;
      if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid UserId');
      req.keyStore = keyStore;
      req.user = decodedUser;
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
  if (!accessToken) throw new AuthFailureError('Invalid Request');

  try {
    const decodedUser = JWT.verify(accessToken, keyStore.publicKey) as AuthPayload;
    if (userId !== decodedUser.userId) throw new AuthFailureError('Invalid UserId');
    req.keyStore = keyStore;
    // req.user = decodedUser;
    return next();
  } catch (error) {
    throw error;
  }
})

export const verifyJWT = async (token: string, keySecret: string) => {
  return await JWT.verify(token, keySecret) as AuthPayload;
}