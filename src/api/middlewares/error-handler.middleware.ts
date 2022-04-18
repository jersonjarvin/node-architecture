/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResponseCodes } from '@common/constants/response-codes';
import { logger } from '@common/utils';
import { ErrorResponse } from '@common/utils/error-response';
import { HttpException } from '@common/utils/http-exception';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = async (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const fullPath = `${req.method} ${req.protocol}://${req.headers.host}${req.originalUrl}`;

  let logMessage = `${err.message}\n\tpath: ${fullPath}`;
  if (req.method !== 'GET' && req.method !== 'DELETE') {
    logMessage += `\n\trequest body: ${JSON.stringify(req.body)}`;
  }
  logMessage += `\n\trequest headers: ${JSON.stringify(req.headers)}`;
  logMessage += `\n\tstacktrace: ${err.stack}`;
  logger.error(logMessage);

  if (isHttpException(err)) {
    const error = <HttpException>err;
    const errorResponse = new ErrorResponse({
      code: error.code || ResponseCodes.FAILURE,
      status: error.status,
      message: error.message,
      description: error.description,
      path: fullPath
    });
    return res.status(error.status).json(errorResponse);
  } else {
    logger.error(err);
    const errorResponse = new ErrorResponse({
      code: ResponseCodes.FAILURE,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
      path: fullPath
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};

const isHttpException = (error: object | any) => {
  if (error instanceof HttpException) {
    return true;
  } else {
    return false;
  }
};
