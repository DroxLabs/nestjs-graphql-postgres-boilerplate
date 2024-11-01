import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GlobalLogger } from '../Logger/GlobalLogger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // ! global logger testing
    GlobalLogger.log('Log', 'AppController');
    GlobalLogger.debug(
      {
        name: 'developer',
        items: [1, 2, 3, 4],
      },
      'AppController',
    );
    GlobalLogger.warn('Warn', 'AppController');
    GlobalLogger.error(
      {
        error: {
          status: 400,
          message: 'Bad Request',
        },
      },
      'AppController',
    );

    return this.appService.getHello();
  }

  @Get('infinity')
  infinity() {
    while (true) {}
  }
}
