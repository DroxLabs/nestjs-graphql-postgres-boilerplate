import { Global, Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [
    NestElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    }),
  ],
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class ElasticSearchModule {}
