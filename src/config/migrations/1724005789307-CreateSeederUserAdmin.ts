import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeederUserAdmin1724005789307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" ("name", "email", "password", "roleId", "birth_date")
      VALUES (
        'Admin', 
        'admin@email.com', 
        'Abc123*', 
        (SELECT "id" FROM "role" WHERE "role" = 'admin' LIMIT 1),
        '2000-01-01' -- Adicione um valor para birth_date
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "user" WHERE "email" = 'admin@email.com'
    `);
  }
}
