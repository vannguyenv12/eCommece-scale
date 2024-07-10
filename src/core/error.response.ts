import { StatusCodes } from "http-status-codes";

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
}

const ReasonStatusCode = {
  FORBIDDEN: 'Bad request error',
  CONFLICT: 'Conflict error',
}

class ErrorResponse extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, statusCode: StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super(message, StatusCode.FORBIDDEN);
  }
}