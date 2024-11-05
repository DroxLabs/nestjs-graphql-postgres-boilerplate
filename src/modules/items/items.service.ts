import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Database } from 'src/database';

@Injectable()
export class ItemsService {
  create() {}

  async bulkInsertItems(totalItems: number = 1000000): Promise<void> {
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
      const date = faker.date.past();
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
        `('${item.title}', '${item.description}', '${item.tags}', '${item.tagsString}', ${item.price}, '${item.dateUploaded}', '${item.lastUpdated}')`,
      );
    }

    console.log(`Inserting ${values.length} items into the database...`);

    const query = `
      INSERT INTO items (title, description, tags, tagsString, price, "dateUploaded", "lastUpdated")
      VALUES ${values.join(', ')}
    `;

    await Database.query(query);

    console.log(`Inserted ${totalItems} items into the database.`);
  }

  getRandomItems<T>(array: T[], count: number = 5): T[] {
    // Shuffle the array
    const shuffledArray = [...array].sort(() => 0.5 - Math.random());

    // Return the first `count` items
    return shuffledArray.slice(0, count);
  }
}
