import * as dotenv from 'dotenv';
dotenv.config();

const environment = {
  appName: process.env.APP_NAME || 'base-app',
  appDescription: process.env.APP_DESCRIPTION || '🚀 base project with clean architecture',
  appVersion: process.env.APP_VERSION || '1.0.0',

  nodeEnv: process.env.NODE_ENV || 'development',
  appEnv: process.env.APP_ENV || 'development',

  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',

  port: process.env.APP_PORT || 4000,

  basePath: process.env.BASE_PATH || '/api',
  basePathSwagger: process.env.BASE_PATH_SWAGGER || '/swagger',
  logDirectory: process.env.LOG_DIR || 'logs'
};

export { environment };
