import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableCreated1730661352481 implements MigrationInterface {
    name = 'UserTableCreated1730661352481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "dateJoined" date NOT NULL DEFAULT ('now'::text)::date, "refreshToken" character varying, CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id", "email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
