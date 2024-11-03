import { ILoggerService } from './logger.type';

export class Logger {
  private static loggerService: ILoggerService;

  static initialize(loggerService: ILoggerService) {
    Logger.loggerService = loggerService;
  }

  static log(message: any, context?: string): void {
    Logger.loggerService?.log(message, context);
  }

  static warn(message: any, context?: string): void {
    Logger.loggerService?.warn(message, context);
  }

  static error(message: any, trace?: string, context?: string): void {
    Logger.loggerService?.error(message, trace, context);
  }

  static debug(message: any, context?: string): void {
    Logger.loggerService?.debug(message, context);
  }
}
