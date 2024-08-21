import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeederUserAdmin1724005789307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user" ("name", "email", "password", "roleId", "birth_date")
      VALUES (
        'Admin', 
        'admin@email.com', 
        '$2b$10$pRHpayh70V4beOnhVqtWQ.H0FDF4cIk9AF5Wc1NDYmshbZsui5Vgy', 
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
