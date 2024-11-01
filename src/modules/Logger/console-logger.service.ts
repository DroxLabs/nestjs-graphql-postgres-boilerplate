import { Injectable, Logger } from '@nestjs/common';
import { ILoggerService } from './logger.type';

@Injectable()
export class ConsoleLoggerService implements ILoggerService {
  private readonly logger = new Logger(ConsoleLoggerService.name);

  log(message: any, context?: string): void {
    this.logger.log(this.formatMessage(message), context);
  }

  warn(message: any, context?: string): void {
    this.logger.warn(this.formatMessage(message), context);
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(this.formatMessage(message), trace, context);
  }

  debug(message: any, context?: string): void {
    this.logger.debug(this.formatMessage(message), context);
  }

  private formatMessage(message: any): string {
    // If the message is not a string, convert it to a JSON string
    return typeof message === 'string'
      ? message
      : JSON.stringify(message, null, 2);
  }
}
