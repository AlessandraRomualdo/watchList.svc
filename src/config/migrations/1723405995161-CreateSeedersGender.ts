import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedersGender1723405995161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "gender" ("gender") VALUES 
        ('Ação'),
        ('Aventura'),
        ('Comédia'),
        ('Drama'),
        ('Fantasia'),
        ('Histórico'),
        ('Terror'),
        ('Musical'),
        ('Mistério'),
        ('Romance'),
        ('Ficção Científica'),
        ('Suspense'),
        ('Faroeste'),
        ('Animação'),
        ('Crime'),
        ('Documentário'),
        ('Família'),
        ('Biografia'),
        ('Guerra'),
        ('Noir'),
        ('Distopia'),
        ('Épico'),
        ('Psicológico'),
        ('Comédia Romântica')`,
    );
  }

  public async down(): Promise<void> {}
}
