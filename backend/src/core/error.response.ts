import { ReasonPhrases } from "../const/reasonPhrases";
import { StatusCodes } from "../const/statusCodes";

class ErrorResponse extends Error {
  status: number;
  errors: any[];
  constructor(message: string, status: number, errors: any[] = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    statusCode = StatusCodes.BAD_REQUEST,
    errors: any[] = []
  ) {
    super(message, statusCode, errors);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCodes.NOT_FOUND,
  ) {
    super(message, statusCode);
  }
}

export {
  BadRequestError,
  NotFoundError,
};
