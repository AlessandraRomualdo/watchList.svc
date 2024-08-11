import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1723130505871 implements MigrationInterface {
  name = 'CreateTables1723130505871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list_serie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "listId" uuid, "serieId" uuid, CONSTRAINT "PK_7e8d0d120d62fecb4cc2a89c3b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "serie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "poster" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "seasons" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "genderId" uuid, "listSeriesId" uuid, CONSTRAINT "PK_8c8f5d9ab9991a8b07a7b2726fa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying(25) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "poster" character varying(500) NOT NULL, "description" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "genderId" uuid, "listMoviesId" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list_movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "listId" uuid, "movieId" uuid, CONSTRAINT "PK_a82f5d8f3f0f7fb650cb2b57f4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "birth_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "roleId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_serie" ADD CONSTRAINT "FK_dda0b1dc9a92ee0a0a76c4b3f4b" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_serie" ADD CONSTRAINT "FK_c61742ddd81e39d116fa7c1f828" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "serie" ADD CONSTRAINT "FK_bc8ec299721c8ff23d333145ed9" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "serie" ADD CONSTRAINT "FK_f2bedb0597d26501c3a80384594" FOREIGN KEY ("listSeriesId") REFERENCES "list_serie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_902bb01f6e71899b094c808efb4" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "movie" ADD CONSTRAINT "FK_9486e35306c6472f80c4714c05f" FOREIGN KEY ("listMoviesId") REFERENCES "list_movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
    await queryRunner.query(
      `ALTER TABLE "list_movie" ADD CONSTRAINT "FK_28c07fc26680987da9d4aff1f1b" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movie" ADD CONSTRAINT "FK_d3f94afb2d0e54ef7377ebcbeac" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" ADD CONSTRAINT "FK_46ded14b26382088c9f032f8953" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list" DROP CONSTRAINT "FK_46ded14b26382088c9f032f8953"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movie" DROP CONSTRAINT "FK_d3f94afb2d0e54ef7377ebcbeac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_movie" DROP CONSTRAINT "FK_28c07fc26680987da9d4aff1f1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_9486e35306c6472f80c4714c05f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_902bb01f6e71899b094c808efb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "serie" DROP CONSTRAINT "FK_f2bedb0597d26501c3a80384594"`,
    );
    await queryRunner.query(
      `ALTER TABLE "serie" DROP CONSTRAINT "FK_bc8ec299721c8ff23d333145ed9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_serie" DROP CONSTRAINT "FK_c61742ddd81e39d116fa7c1f828"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_serie" DROP CONSTRAINT "FK_dda0b1dc9a92ee0a0a76c4b3f4b"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "list"`);
    await queryRunner.query(`DROP TABLE "list_movie"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "gender"`);
    await queryRunner.query(`DROP TABLE "serie"`);
    await queryRunner.query(`DROP TABLE "list_serie"`);
  }
}
