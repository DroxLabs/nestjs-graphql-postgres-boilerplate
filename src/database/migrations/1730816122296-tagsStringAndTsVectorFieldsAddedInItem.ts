import { MigrationInterface, QueryRunner } from 'typeorm';

export class TagsStringAndTsVectorFieldsAddedInItem1730816122296
  implements MigrationInterface
{
  name = 'TagsStringAndTsVectorFieldsAddedInItem1730816122296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ADD "tagsString" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "dateUploaded" date NOT NULL DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD "lastUpdated" date NOT NULL DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "searchVector" tsvector`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "searchVector"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "lastUpdated"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "dateUploaded"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "tagsString"`);
  }
}
