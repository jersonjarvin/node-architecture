import { injectable } from 'inversify';
import { SqlHelper } from './mssql-helper';
@injectable()
export default class Sql extends SqlHelper {
  constructor() {
    super({
      user: 'sa',
      password: 'SOPORTE',
      database: 'EmployeeDB',
      server: 'LAPTOP-IAK69JE9',
      encrypt: false
    });
  }
}
