import { Controller, Get, Query } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('index')
  index() {
    return this.itemsService.indexAllItems();
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.itemsService.searchItems(query);
  }

  @Get()
  create() {
    return this.itemsService.bulkInsertItems();
  }
}
