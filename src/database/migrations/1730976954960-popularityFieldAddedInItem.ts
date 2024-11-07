import { MigrationInterface, QueryRunner } from "typeorm";

export class PopularityFieldAddedInItem1730976954960 implements MigrationInterface {
    name = 'PopularityFieldAddedInItem1730976954960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."item_search_vector_idx"`);
        await queryRunner.query(`ALTER TABLE "items" ADD "popularity" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "popularity"`);
        await queryRunner.query(`CREATE INDEX "item_search_vector_idx" ON "items" ("searchVector") `);
    }

}
