import { NextFunction, Request, Response } from "express";
import { CREATED } from "~/core/success.error";
import AccessService from "~/services/access.service";

class AccessController {
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: 'Registered Ok!',
      metadata: await AccessService.signUp(req.body)
    }).send(res);

  }
}

export const accessController: AccessController = new AccessController();