import HttpStatusCode from "~/utils/httpStatusCode";

const { ReasonPhrases: ReasonStatusCode, StatusCodes } = HttpStatusCode;

class ErrorResponse extends Error {
  private statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super(message, StatusCodes.CONFLICT);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(message = ReasonStatusCode.UNAUTHORIZED) {
    super(message, StatusCodes.FORBIDDEN);
  }
}