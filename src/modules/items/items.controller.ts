import { Controller, Get, Post, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Database } from 'src/database';
import { ItemGraphRanges } from './item.types';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('search')
  search(@Query('query') query: string) {
    return this.itemsService.searchItems(query);
  }

  @Get('range')
  async getGraphDataForRange(@Query('range') range: ItemGraphRanges) {
    return await this.itemsService.getDataForTimeRange(range);
  }

  // ! INSERTION OF DATA
  @Post()
  create() {
    return this.itemsService.bulkInsertItems();
  }

  @Get('create/hypertable')
  async enableHypertable() {
    await Database.query(`
      SELECT create_hypertable('items', 'dateUploaded', migrate_data => true);
    `);
  }
}
