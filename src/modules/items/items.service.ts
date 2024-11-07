import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Database, Item } from 'src/database';
import { Logger } from '../Logger/GlobalLogger';

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

  async bulkInsertItems(totalItems: number = 1000000): Promise<void> {
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
        };

        values.push(
          `('${item.title}', '${item.description}', ARRAY[${item.tags.map((val) => `'${val}'`)}], '${item.tagsString}', ${item.price}, '${item.dateUploaded}', '${item.lastUpdated}')`,
        );
      }

      Logger.log(`Inserting ${values.length} items into the database...`);

      const query = `
      INSERT INTO items (title, description, tags, "tagsString", price, "dateUploaded", "lastUpdated")
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
