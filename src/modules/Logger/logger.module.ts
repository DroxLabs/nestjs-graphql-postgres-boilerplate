import { Module, Global } from '@nestjs/common';
import { ConsoleLoggerService } from './console-logger.service';
import { ILoggerService } from './logger.type';

@Global()
@Module({
  providers: [
    {
      provide: ILoggerService,
      useClass: ConsoleLoggerService,
    },
  ],
  exports: [ILoggerService],
})
export class LoggerModule {}
