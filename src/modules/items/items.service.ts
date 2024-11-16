import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Database, Item } from 'src/database';
import { Logger } from '../Logger/GlobalLogger';
import { ItemGraphBucketSizes, ItemGraphRanges } from './item.types';

@Injectable()
export class ItemsService {
  create() {}

  async searchItems(query: string): Promise<Item[]> {
    try {
      Logger.log(`Searching for items with query: ${query}`);

      // ? using search vector column for faster text searching
      const searchResults = await Item.createQueryBuilder('item')
        .where("item.searchVector @@ plainto_tsquery('english', :query)", {
          query,
        })
        .orderBy(
          "ts_rank(item.searchVector, plainto_tsquery('english', :query))",
          'DESC',
        )
        .addOrderBy('item.popularity', 'DESC')
        .limit(20)
        .getMany();

      return searchResults;
    } catch (error) {
      Logger.error('Error searching for items:', error);
    }
  }

  // Generic method to fetch data for a specific time range
  private async fetchAggregatedData(
    startDate: Date,
    bucketSize: string,
  ): Promise<any> {
    try {
      Logger.debug(startDate, 'Start Date');
      Logger.debug(bucketSize, 'Bucket Size');

      const res = await Database.query(
        `
      SELECT time_bucket($1, "dateUploaded") AS time_bucket,
             COUNT(*) AS total_items,
             SUM(price) AS total_price
      FROM items
      WHERE "dateUploaded" >= $2
      GROUP BY time_bucket
      ORDER BY time_bucket;
      `,
        [bucketSize, startDate],
      );

      return res;
    } catch (error) {
      Logger.error('Error fetching aggregated data:', error);
    }
  }

  // Method for fetching data for predefined time ranges
  async getDataForTimeRange(range: ItemGraphRanges): Promise<any> {
    const now = new Date();
    let startDate: Date;
    let bucketSize: string;

    switch (range) {
      case ItemGraphRanges.ONE_DAY:
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
        bucketSize = ItemGraphBucketSizes.ONE_HOUR;
        break;

      case ItemGraphRanges.ONE_WEEK:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
        bucketSize = ItemGraphBucketSizes.ONE_DAY;
        break;

      case ItemGraphRanges.ONE_MONTH:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1); // 1 month ago
        bucketSize = ItemGraphBucketSizes.ONE_DAY;
        break;

      case ItemGraphRanges.THREE_MONTHS:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3); // 3 months ago
        bucketSize = ItemGraphBucketSizes.ONE_WEEK;
        break;

      case ItemGraphRanges.ONE_YEAR:
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1); // 1 year ago
        bucketSize = ItemGraphBucketSizes.ONE_MONTH;
        break;

      default:
        throw new Error('Invalid time range specified');
    }

    return this.fetchAggregatedData(startDate, bucketSize);
  }

  // ! INSERTION OF ITEMS INTO THE DATABASE
  async bulkInsertItems(totalItems: number = 500000): Promise<void> {
    try {
      const availableLanguages = [
        'js',
        'ts',
        'node',
        'react',
        'c',
        'c++',
        'c#',
        'python',
        'django',
        'rust',
        'ruby',
        'solidity',
        'express',
        'next',
        'nest',
        'flask',
        'golang',
        'carva',
        'html',
        'css',
      ];

      const values: string[] = [];

      for (let i = 0; i < totalItems; i++) {
        const date = faker.date.past().toISOString();
        const tags = this.getRandomItems(availableLanguages);

        // Generate random item data using faker
        const item = {
          title: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          tags,
          tagsString: tags.join(' '),
          price: faker.number.int({ min: 100, max: 10000 }),
          dateUploaded: date,
          lastUpdated: date,
          picture: faker.image.urlLoremFlickr({
            height: 600,
            width: 600,
            category: 'object',
          }),
        };

        values.push(
          `('${item.title}', '${item.description}', ARRAY[${item.tags.map((val) => `'${val}'`)}], '${item.tagsString}', ${item.price}, '${item.dateUploaded}', '${item.lastUpdated}', '${Math.floor(Math.random() * 100)}', '${item.picture}')`,
        );
      }

      Logger.log(`Inserting ${values.length} items into the database...`);

      const query = `
      INSERT INTO items (title, description, tags, "tagsString", price, "dateUploaded", "lastUpdated", popularity, picture)
      VALUES ${values.join(', ')}
    `;

      await Database.query(query);

      Logger.log(`Inserted ${totalItems} items into the database.`);
    } catch (e) {
      Logger.error('Error inserting items into the database:', e);
    }
  }

  getRandomItems<T>(array: T[], count: number = 5): T[] {
    // Shuffle the array
    const shuffledArray = [...array].sort(() => 0.5 - Math.random());

    // Return the first `count` items
    return shuffledArray.slice(0, count);
  }
}
