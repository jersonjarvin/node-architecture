import { Request, Response, NextFunction } from 'express';
import { HEADER, ResponseCodes } from '@common/constants';
import { environment } from '@common/config/environment';
import { ErrorResponse } from '@common/utils/error-response';
import { StatusCodes } from 'http-status-codes';
export const validateHeaders = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errorsHeaders: any = [];
    const healthy = `${environment.basePath}/status/health`;
    if (req.path !== healthy && req.method !== 'OPTIONS' && req.path != environment.basePathSwagger) {
      if (req.headers[HEADER.COUNTRY] === undefined) {
        errorsHeaders.push({
          field: HEADER.COUNTRY,
          message: `header ${HEADER.COUNTRY} no sent`
        });
      }
      if (req.headers[HEADER.COMMERCE] === undefined) {
        errorsHeaders.push({
          field: HEADER.COMMERCE,
          message: `header ${HEADER.COMMERCE} no sent`
        });
      }
      if (req.headers[HEADER.USER] === undefined) {
        errorsHeaders.push({
          field: HEADER.USER,
          message: `header ${HEADER.USER} no sent`
        });
      }
    }
    if (errorsHeaders.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        new ErrorResponse({
          code: ResponseCodes.HEADER_NOT_SENT,
          status: StatusCodes.BAD_REQUEST,
          errors: errorsHeaders
        })
      );
    }
    await next();
  };
};
