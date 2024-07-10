import { NextFunction, Request, Response } from "express";
import AccessService from "~/services/access.service";

class AccessController {
  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(`[P]::signUp::`, req.body)

      return res.status(201).json(await AccessService.signUp(req.body))
    } catch (error) {
      next(error);
    }
  }
}

export const accessController: AccessController = new AccessController();