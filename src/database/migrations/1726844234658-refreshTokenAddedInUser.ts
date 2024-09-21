import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenAddedInUser1726844234658 implements MigrationInterface {
    name = 'RefreshTokenAddedInUser1726844234658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
