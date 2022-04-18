import { environment } from '@common/config';
import { WinstonLogger } from './winston-logger';
const logger = new WinstonLogger(true, environment.isDevelopment, environment.logDirectory);
export { logger };
export * from './http-exception';
export * from './winston-logger';
