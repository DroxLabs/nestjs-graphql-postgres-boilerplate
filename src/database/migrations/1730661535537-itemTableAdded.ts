import { MigrationInterface, QueryRunner } from "typeorm";

export class ItemTableAdded1730661535537 implements MigrationInterface {
    name = 'ItemTableAdded1730661535537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "tags" text array NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "items"`);
    }

}
