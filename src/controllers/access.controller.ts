import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "~/core/success.error";
import AccessService from "~/services/access.service";

class AccessController {
  public handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Get Token Success!',
      metadata: await AccessService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      })
    }).send(res);
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Logout Success!',
      metadata: await AccessService.logout({ keyStore: req.keyStore })
    }).send(res);
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Login Success!',
      metadata: await AccessService.login(req.body)
    }).send(res);
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: 'Registered Ok!',
      metadata: await AccessService.signUp(req.body)
    }).send(res);
  }
}

export const accessController: AccessController = new AccessController();