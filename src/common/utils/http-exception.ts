import { getReasonPhrase, StatusCodes } from 'http-status-codes';

type IHttpError = {
  code?: string;
  message: string | object | any;
  description?: string;
  stack?: string;
};

/**
 * @param status HTTP response status code.
 * @param code  code for the API consumer to understand the error and handle is accordingly.
 * @param message string or object describing the error condition.
 * @param description lengthier explanation of the message - optional.
 * @param stack where the exception occurs - optional.
 */

export class HttpException extends Error {
  status: StatusCodes;
  message: string | object | any;
  code?: string;
  description?: string;
  constructor(status: StatusCodes, params: IHttpError = {} as IHttpError) {
    super(params.message);
    this.status = status;
    this.message = params.message;
    this.code = params?.code;
    this.description = params?.description;
    if (params.stack) {
      this.stack = params.stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

const retrieveData = (params: IHttpError = {} as IHttpError, status: StatusCodes) => {
  params.message = params.message ? params.message : getReasonPhrase(status);
  return params;
};

export class BadRequestException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.BAD_REQUEST, retrieveData(params, StatusCodes.BAD_REQUEST));
  }
}
export class UnauthorizedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.UNAUTHORIZED, retrieveData(params, StatusCodes.UNAUTHORIZED));
  }
}
export class PaymentRequiredException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.PAYMENT_REQUIRED, retrieveData(params, StatusCodes.PAYMENT_REQUIRED));
  }
}

export class ForbiddenException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.FORBIDDEN, retrieveData(params, StatusCodes.FORBIDDEN));
  }
}
export class NotFoundException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.NOT_FOUND, retrieveData(params, StatusCodes.NOT_FOUND));
  }
}
export class MethodNotAllowedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.METHOD_NOT_ALLOWED, retrieveData(params, StatusCodes.METHOD_NOT_ALLOWED));
  }
}
export class NotAcceptableException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.NOT_ACCEPTABLE, retrieveData(params, StatusCodes.NOT_ACCEPTABLE));
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.PROXY_AUTHENTICATION_REQUIRED, retrieveData(params, StatusCodes.PROXY_AUTHENTICATION_REQUIRED));
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.REQUEST_TIMEOUT, retrieveData(params, StatusCodes.REQUEST_TIMEOUT));
  }
}

export class ConflictException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.CONFLICT, retrieveData(params, StatusCodes.CONFLICT));
  }
}

export class GoneException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.GONE, retrieveData(params, StatusCodes.GONE));
  }
}

export class LengthRequiredException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.LENGTH_REQUIRED, retrieveData(params, StatusCodes.LENGTH_REQUIRED));
  }
}
export class PreconditionFailedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.PRECONDITION_FAILED, retrieveData(params, StatusCodes.PRECONDITION_FAILED));
  }
}
export class RequestTooLongException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.REQUEST_TOO_LONG, retrieveData(params, StatusCodes.REQUEST_TOO_LONG));
  }
}
export class UnsupportedMediaTypeException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.UNSUPPORTED_MEDIA_TYPE, retrieveData(params, StatusCodes.UNSUPPORTED_MEDIA_TYPE));
  }
}
export class RequestRangeNotSatisfiableException extends HttpException {
  constructor(params?: IHttpError) {
    super(
      StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE,
      retrieveData(params, StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE)
    );
  }
}
export class ExpectationFailedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.EXPECTATION_FAILED, retrieveData(params, StatusCodes.EXPECTATION_FAILED));
  }
}
export class ImATeapotException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.IM_A_TEAPOT, retrieveData(params, StatusCodes.IM_A_TEAPOT));
  }
}
export class MisdirectedRequestException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.MISDIRECTED_REQUEST, retrieveData(params, StatusCodes.MISDIRECTED_REQUEST));
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, retrieveData(params, StatusCodes.UNPROCESSABLE_ENTITY));
  }
}
export class LockedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.LOCKED, retrieveData(params, StatusCodes.LOCKED));
  }
}
export class FailedDependencyException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.FAILED_DEPENDENCY, retrieveData(params, StatusCodes.FAILED_DEPENDENCY));
  }
}
export class PreconditionRequiredException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.PRECONDITION_REQUIRED, retrieveData(params, StatusCodes.PRECONDITION_REQUIRED));
  }
}
export class TooManyRequestsException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.TOO_MANY_REQUESTS, retrieveData(params, StatusCodes.TOO_MANY_REQUESTS));
  }
}
export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(params?: IHttpError) {
    super(
      StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE,
      retrieveData(params, StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE)
    );
  }
}
export class UnavailableForLegalReasonsException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS, retrieveData(params, StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS));
  }
}
export class InternalServerErrorException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, retrieveData(params, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export class NotImplementedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.NOT_IMPLEMENTED, retrieveData(params, StatusCodes.NOT_IMPLEMENTED));
  }
}
export class BadGatewayException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.BAD_GATEWAY, retrieveData(params, StatusCodes.BAD_GATEWAY));
  }
}
export class ServiceUnavailableException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.SERVICE_UNAVAILABLE, retrieveData(params, StatusCodes.SERVICE_UNAVAILABLE));
  }
}
export class GatewayTimeoutException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.GATEWAY_TIMEOUT, retrieveData(params, StatusCodes.GATEWAY_TIMEOUT));
  }
}
export class HttpVersionNotSupportedException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.HTTP_VERSION_NOT_SUPPORTED, retrieveData(params, StatusCodes.HTTP_VERSION_NOT_SUPPORTED));
  }
}
export class InsufficientStorageException extends HttpException {
  constructor(params?: IHttpError) {
    super(StatusCodes.INSUFFICIENT_STORAGE, retrieveData(params, StatusCodes.INSUFFICIENT_STORAGE));
  }
}
export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(params?: IHttpError) {
    super(
      StatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
      retrieveData(params, StatusCodes.NETWORK_AUTHENTICATION_REQUIRED)
    );
  }
}

export class CreateErrorException extends HttpException {
  constructor(status: StatusCodes, params: IHttpError = {} as IHttpError) {
    super(status, params);
  }
}
