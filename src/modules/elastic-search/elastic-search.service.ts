import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticSearchService {
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  async bulkIndex(body: any) {
    return this.elasticsearchService.bulk({ refresh: true, body });
  }
}
