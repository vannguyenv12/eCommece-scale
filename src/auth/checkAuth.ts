import { NextFunction, Request, Response } from "express";
import { findById } from "~/services/apikey.service";

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

export const apiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error'
      });
    }
    const objKey = await findById(key);

    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error'
      });
    }

    req.objKey = objKey;
    return next();

  } catch (error) {

  }
}

export const permission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission Denied'
      });
    }

    console.log('permissions::', req.objKey.permissions);
    const validPermission = req.objKey.permissions.includes(permission);

    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission Denied'
      });
    }

    return next();
  }
}

export const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}