import { ResponseCodes } from '@common/constants';
import { ErrorResponse, IParamError } from '@common/utils/error-response';
import { Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
  ok(res: Response, data?: string | object | any) {
    return res.status(StatusCodes.OK).json(data);
  }
  created(res: Response, message?: string) {
    return res.status(StatusCodes.CREATED).json(message);
  }
  forbidden(res: Response, message?: string) {
    return res.status(StatusCodes.FORBIDDEN).json(message);
  }
  notFound(res: Response, message?: string) {
    return res.status(StatusCodes.NOT_FOUND).json(message);
  }
  conflict(res: Response, message?: string) {
    return res.status(StatusCodes.CONFLICT).json(message);
  }
  internalError(res: Response, message?: string) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(message);
  }
  unauthorized(res: Response, message?: string) {
    return res.status(StatusCodes.UNAUTHORIZED).json(message);
  }
  invalidParamError(res: Response, errors: [IParamError]) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      new ErrorResponse({
        code: ResponseCodes.MODEL_IS_NOT_VALID,
        message: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        errors: errors
      })
    );
  }
  result(res: Response, status: StatusCodes, data?: string | object | any) {
    return res.status(status).json(data);
  }
}
