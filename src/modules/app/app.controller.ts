import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '../Logger/GlobalLogger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // ! global logger testing
    Logger.log('Log', 'AppController');
    Logger.debug(
      {
        name: 'developer',
        items: [1, 2, 3, 4],
      },
      'AppController',
    );
    Logger.warn('Warn', 'AppController');
    Logger.error(
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
