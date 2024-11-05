import { MigrationInterface, QueryRunner } from 'typeorm';

// ! THIS IS A MANUALLY CREATED MIGRATION FILE
export class AddSearchVectorToItem1730816122299 implements MigrationInterface {
  name = 'AddSearchVectorToItem1730816122299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 2: Populate the `search_vector` with existing data
    await queryRunner.query(`
      UPDATE "items"
      SET "searchVector" = 
        to_tsvector('english', coalesce("title", '') || ' ' || coalesce("description", '') || ' ' || coalesce("tagsString", ''))
    `);

    // Step 3: Create a GIN index on `searchVector` for full-text search
    await queryRunner.query(`
      CREATE INDEX "item_search_vector_idx" ON "items" USING GIN ("searchVector")
    `);

    // Step 4: Set up a trigger to update `searchVector` on INSERT/UPDATE
    await queryRunner.query(`
      CREATE FUNCTION update_search_vector() RETURNS trigger AS $$
      BEGIN
        NEW."searchVector" := 
          to_tsvector('english', coalesce(NEW."title", '') || ' ' || coalesce(NEW."description", '') || ' ' || coalesce(NEW."tagsString", ''));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER item_search_vector_trigger
      BEFORE INSERT OR UPDATE ON "items"
      FOR EACH ROW EXECUTE FUNCTION update_search_vector();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER item_search_vector_trigger ON "items"`,
    );
    await queryRunner.query(`DROP FUNCTION update_search_vector`);
    await queryRunner.query(`DROP INDEX "item_search_vector_idx"`);
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "searchVector"`);
  }
}
