import { Response } from "express";

const StatusCode = {
  OK: 200,
  CREATED: 201,
}

const ReasonStatusCode = {
  OK: 'Success',
  CREATED: 'Created',
}


export class SuccessResponse {
  private message: string;
  private statusCode: number;
  private metadata: any;

  constructor({ message = '', statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
    this.message = !message ? reasonStatusCode : message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, headers = {}) {
    return res.status(this.statusCode).json(this);
  }
}

export class OK extends SuccessResponse {
  constructor({ message = '', metadata = {} }) {
    super({ message, metadata })
  }
}

export class CREATED extends SuccessResponse {
  private options: any;

  constructor({ message = '', statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata = {}, options = {} }) {
    super({ message, statusCode, reasonStatusCode, metadata })
    this.options = options
  }
}