import { MigrationInterface, QueryRunner } from "typeorm";

export class PictureAddedInItemEntity1731663408445 implements MigrationInterface {
    name = 'PictureAddedInItemEntity1731663408445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" ADD "picture" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "picture"`);
    }

}
