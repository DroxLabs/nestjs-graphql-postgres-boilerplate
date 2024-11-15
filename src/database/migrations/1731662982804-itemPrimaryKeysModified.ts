import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItemPrimaryKeysModified1731662982804
  implements MigrationInterface
{
  name = 'ItemPrimaryKeysModified1731662982804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_145389bdbe4f2cdd6a7dd0991d"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "idIndex"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "idIndex" integer GENERATED ALWAYS AS (id) STORED NOT NULL`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES ($1, $2, $3, $4, $5, $6)`,
      ['main', 'public', 'items', 'GENERATED_COLUMN', 'idIndex', 'id'],
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_145389bdbe4f2cdd6a7dd0991d" ON "items" ("idIndex") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_145389bdbe4f2cdd6a7dd0991d"`,
    );
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "database" = $3 AND "schema" = $4 AND "table" = $5`,
      ['GENERATED_COLUMN', 'idIndex', 'main', 'public', 'items'],
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "idIndex"`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD "idIndex" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_145389bdbe4f2cdd6a7dd0991d" ON "items" ("idIndex") `,
    );
  }
}
