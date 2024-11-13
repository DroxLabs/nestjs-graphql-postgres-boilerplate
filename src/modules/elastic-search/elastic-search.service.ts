import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';
import { Item } from 'src/database';
import { ElasticSearchIndex } from './elastic.search.types';
import { Logger } from '../Logger/GlobalLogger';

@Injectable()
export class ElasticSearchService {
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  async bulkIndex(body: any) {
    return this.elasticsearchService.bulk({ refresh: true, body });
  }

  async searchItems(index: ElasticSearchIndex, query: string) {
    try {
      const searchRes = await this.elasticsearchService.search({
        index,
        query: {
          multi_match: {
            query,
            fields: ['title', 'description', 'tagsString'],
          },
        },
        from: 0,
        size: 10,
        sort: [
          {
            _score: {
              order: 'desc',
            },
          },
        ],
      });

      const items = searchRes.hits.hits.map((hit) => hit._source as Item);

      return items;
    } catch (e) {
      Logger.error('Error searching items:', e);
    }
  }
}
