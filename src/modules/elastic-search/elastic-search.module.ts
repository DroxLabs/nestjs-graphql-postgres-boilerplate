import { Global, Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [
    NestElasticsearchModule.register({
      // node: process.env.ELASTICSEARCH_NODE || 'http://127.0.0.1:9200',
      node: 'http://es01:9200',
    }),
  ],
  providers: [ElasticSearchService],
  exports: [ElasticSearchService],
})
export class ElasticSearchModule {}
