import { ILoggerService } from './logger.type';

export class GlobalLogger {
  private static loggerService: ILoggerService;

  static initialize(loggerService: ILoggerService) {
    GlobalLogger.loggerService = loggerService;
  }

  static log(message: any, context?: string): void {
    GlobalLogger.loggerService?.log(message, context);
  }

  static warn(message: any, context?: string): void {
    GlobalLogger.loggerService?.warn(message, context);
  }

  static error(message: any, trace?: string, context?: string): void {
    GlobalLogger.loggerService?.error(message, trace, context);
  }

  static debug(message: any, context?: string): void {
    GlobalLogger.loggerService?.debug(message, context);
  }
}
