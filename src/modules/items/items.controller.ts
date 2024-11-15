import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Database } from 'src/database';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('search')
  search(@Query('query') query: string) {
    return this.itemsService.searchItems(query);
  }

  @Get()
  create() {
    return this.itemsService.bulkInsertItems();
  }

  @Get('create/hypertable')
  async enableHypertable() {
    await Database.query(`
      SELECT create_hypertable('items', 'dateUploaded');
    `);
  }
}
