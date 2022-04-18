import { addColors, createLogger, format, Logger as WinstonLoggerType, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import emoji from 'node-emoji';

export interface IWinstonLogger {
  silly(msg: string, ...args: any[]): void;
  debug(value: string | unknown, ...args: any[]): void;
  verbose(value: string | unknown, ...args: any[]): void;
  http(value: string | unknown, ...args: any[]): void;
  info(value: string | unknown, ...args: any[]): void;
  warn(value: string | unknown, ...args: any[]): void;
  error(value: string | unknown, ...args: any[]): void;
  error(value: string | Error | unknown, ...args: any[]): void;
}
enum LevelName {
  SILLY = 'silly',
  DEBUG = 'debug',
  VERBOSE = 'verbose',
  HTTP = 'http',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

const LEVEL_SEVERITY = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const LEVEL_COLOR = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'grey',
  debug: 'white',
  silly: 'cyan'
};

const DEFAULT_FORMAT = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.printf((info) =>
    `[${info.timestamp}] ${info.level.toLocaleUpperCase()} ${info.message} ${info.stack || ''}`.trim()
  )
);

const CONSOLE_FORMAT = format.combine(
  format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
  format.errors({ stack: true }),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  format.colorize({ all: true }),
  format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message} ${info.stack || ''}`.trim())
);

class WinstonLogger implements IWinstonLogger {
  private readonly logger: WinstonLoggerType;
  private logLevel: string;
  private pathLogDirectory: string;
  constructor(logFile: boolean, isDevelopment: boolean, pathLogDirectory: string) {
    this.logLevel = isDevelopment ? LevelName.DEBUG : LevelName.INFO;
    this.pathLogDirectory = pathLogDirectory;
    this.logger = this.configureAndGetLogger(logFile);
  }

  silly(msg: string | unknown, ...args: any[]): void {
    this.logger.silly(`${emoji.get('unicorn_face')} ${this.getValue(msg)}`, args);
  }

  debug(msg: string | unknown, ...args: any[]): void {
    this.logger.debug(`${emoji.get('video_game')} ${this.getValue(msg)}}`, args);
  }
  verbose(msg: string | unknown, ...args: any[]): void {
    this.logger.verbose(`${emoji.get('eye-in-speech-bubble')} ${this.getValue(msg)}`, args);
  }
  http(msg: string | unknown, ...args: any[]): void {
    this.logger.http(`${emoji.get('computer')} ${this.getValue(msg)}`, args);
  }
  info(msg: string | unknown, ...args: any[]): void {
    this.logger.info(`${emoji.get('bulb')} ${this.getValue(msg)}`, args);
  }
  warn(msg: string | unknown, ...args: any[]): void {
    this.logger.warn(`${emoji.get('loudspeaker')} ${this.getValue(msg)}`, args);
  }
  error(msg: string | Error | unknown, ...args: any[]): void {
    if (msg instanceof Error) {
      this.logger.error(emoji.get('x'), msg);
    } else {
      this.logger.error(`${emoji.get('x')} ${this.getValue(msg)}`, args);
    }
  }

  private configureAndGetLogger(logFile: boolean): WinstonLoggerType {
    addColors(LEVEL_COLOR);

    let transportsList: any[] = [
      new transports.Console({
        level: this.logLevel,
        handleExceptions: true,
        format: CONSOLE_FORMAT
      })
    ];
    if (logFile) {
      const logsFolder = this.logDirectory();

      transportsList = [
        ...transportsList,
        new transports.File({
          filename: `logs/${logsFolder}/error.log`,
          level: LevelName.ERROR,
          handleExceptions: true,
          format: format.json(),
          maxsize: 5242880, // 5MB
          maxFiles: 1
        }),
        new DailyRotateFile({
          filename: `logs/${logsFolder}/all-%DATE%.log`,
          level: this.logLevel,
          handleExceptions: true,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          format: format.json(),
          maxSize: '20m',
          maxFiles: '30d'
        })
      ];
    }

    return createLogger({
      level: this.logLevel,
      levels: LEVEL_SEVERITY,
      format: DEFAULT_FORMAT,
      transports: transportsList,
      exitOnError: false,
      handleExceptions: true
    });
  }
  private getValue = (value: string | unknown): string => {
    if (typeof value === 'string') {
      return value;
    }
    return JSON.stringify(value);
  };
  private logDirectory() {
    let dir = this.pathLogDirectory;
    if (!dir) dir = path.resolve('logs');

    if (!fs.existsSync(dir)) {
      // Create directory if not exists
      fs.mkdirSync(dir);
    }
    return dir;
  }
}

export { WinstonLogger };
