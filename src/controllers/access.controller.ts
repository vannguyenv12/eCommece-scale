import { NextFunction, Request, Response } from "express";
import AccessService from "~/services/access.service";

class AccessController {
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).json(await AccessService.signUp(req.body))

  }
}

export const accessController: AccessController = new AccessController();