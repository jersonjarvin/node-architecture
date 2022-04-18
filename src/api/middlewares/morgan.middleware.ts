import { environment } from '@common/config';
import { logger } from '@common/utils';
import { NextFunction, Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';

const stream: StreamOptions = {
  write: (message: string | string[]) => logger.http(message.slice(0, Math.max(0, message.lastIndexOf('\n'))))
};

/**
 * Enable Morgan only in development mode.
 */
const skip = () => environment.isProduction;

export const morganMiddleware = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    morgan(':method :url :status :res[content-length] - :response-time ms', {
      stream,
      skip
    })(request, response, next);
  };
};
