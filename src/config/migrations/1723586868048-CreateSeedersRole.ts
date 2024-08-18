import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedersRole1723586868048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "role" ("role") VALUES 
                    ('admin'),
                    ('user'),
                    ('editor')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover dependências antes de deletar os registros da tabela role
    await queryRunner.query(
      `UPDATE "user" SET "roleId" = NULL WHERE "roleId" IS NOT NULL`,
    );
    await queryRunner.query(
      `DELETE FROM "role" WHERE role IN ('admin', 'user', 'editor')`,
    );
  }
}
