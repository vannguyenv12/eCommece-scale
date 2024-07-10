import { Types } from "mongoose";
import { HydratedDocument } from 'mongoose';


export interface IKeyToken {
  user: Types.ObjectId;
  privateKey: string;
  publicKey: string;
  refreshTokensUsed: any;
  refreshToken: string;
}

export type IKeyTokenDocument = HydratedDocument<IKeyToken>