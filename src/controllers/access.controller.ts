import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "~/core/success.error";
import AccessService from "~/services/access.service";

class AccessController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: 'Login Ok!',
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