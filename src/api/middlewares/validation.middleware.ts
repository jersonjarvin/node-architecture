/* eslint-disable max-len */
import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ErrorResponse } from '@common/utils/error-response';
import { ResponseCodes } from '@common/constants';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const validateObject = async (object: any, skipMissingProperties = false): Promise<Array<any>> => {
  const errors: ValidationError[] = await validate(object, { skipMissingProperties });
  const result: Array<any> = [];
  if (errors.length > 0) {
    errors.forEach((e: ValidationError) => {
      const constraints = Object.values(e.constraints || {});
      constraints.forEach((v) => {
        result.push({ field: e.property, message: v });
      });
    });
  }
  return result;
};

export function validation<T>(object: new () => T, skipMissingProperties = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let errorQuery = [];
    let errorBody = [];
    if (req.query && req.method == 'GET') {
      errorQuery = await validateObject(plainToClass(object, req.query), skipMissingProperties);
    }
    if (Object.keys(req.body).length) {
      errorBody = await validateObject(plainToClass(object, req.body), skipMissingProperties);
    }
    if (errorQuery.length | errorBody.length) {
      const errorResponse = new ErrorResponse({
        code: ResponseCodes.MODEL_IS_NOT_VALID,
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message: getReasonPhrase(StatusCodes.UNPROCESSABLE_ENTITY),
        errors: [...errorBody, ...errorQuery] as any
      });

      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorResponse);
    } else {
      await next();
    }
  };
}
