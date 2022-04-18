export type IParamError = {
  field: string;
  message: string;
};

export type IErrorResponse = {
  code?: string;
  status?: number;
  message?: string;
  description?: string;
  path?: string;
  timestamp?: string;
  errors?: [
    {
      field: string;
      message: string;
    }
  ];
};

export class ErrorResponse {
  code?: string;
  status?: number;
  message?: string;
  description?: string;
  path?: string;
  timestamp?: string;
  errors?: [IParamError];

  constructor(params: IErrorResponse) {
    this.code = params.code;
    this.status = params.status;
    this.message = params.message;
    this.description = params.description;
    this.path = params.path;
    this.timestamp = params.timestamp ? params.timestamp : new Date().toISOString();
    this.errors = params.errors;
  }
}
