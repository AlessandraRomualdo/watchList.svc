import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedersSerie1724368205346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "serie" ("title", "poster", "description", "seasons", "genderId") VALUES 
        ('Breaking Bad', 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg', 'Breaking Bad é uma série de televisão dramática norte-americana criada e produzida por Vince Gilligan. Ela retrata a vida do químico Walter White, um homem brilhante frustrado em dar aulas para adolescentes do ensino médio enquanto lida com um filho sofrendo de paralisia cerebral, uma esposa grávida e dívidas intermináveis.', 5, (SELECT id FROM "gender" WHERE "gender" = 'Drama' LIMIT 1)),
        ('The Office', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWYzxPucsQA9Nz1mIM8q4FNCvEmYig65WODQ&s', 'The Office é uma série de televisão de comédia de situação norte-americana que estreou na NBC em 24 de março de 2005. O show é uma adaptação da série de televisão britânica de mesmo nome, criada por Ricky Gervais e Stephen Merchant para a BBC.', 9, (SELECT id FROM "gender" WHERE "gender" = 'Comédia' LIMIT 1)),
        ('Friends', 'https://br.web.img3.acsta.net/pictures/19/12/20/21/27/3055482.jpg', 'Friends é uma série de televisão americana criada por David Crane e Marta Kauffman, que foi ao ar pela primeira vez na NBC em 22 de setembro de 1994. A série foi produzida pela Bright/Kauffman/Crane Productions, em associação com a Warner Bros. Television.', 10, (SELECT id FROM "gender" WHERE "gender" = 'Comédia' LIMIT 1)),
        ('The Mandalorian', 'https://lumiere-a.akamaihd.net/v1/images/the_mandalorian_800d1505.jpeg', 'The Mandalorian é uma série de televisão de ópera espacial americana criada por Jon Favreau para o serviço de streaming Disney+. Faz parte da franquia Star Wars, situada após os eventos de O Retorno de Jedi.', 2, (SELECT id FROM "gender" WHERE "gender" = 'Ficção Científica' LIMIT 1)),
        ('Game of Thrones', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1jGyKS1FLZ7rmyH_AuHcG8iVYoYV93gaNQ&s', 'Game of Thrones é uma série de televisão de fantasia criada por David Benioff e D. B. Weiss para a HBO. É baseada nas séries de romances A Song of Ice and Fire, de George R. R. Martin.', 8, (SELECT id FROM "gender" WHERE "gender" = 'Fantasia' LIMIT 1)),
        ('The Witcher', 'https://br.web.img3.acsta.net/pictures/19/11/29/17/57/5161763.jpg', 'The Witcher é uma série de televisão de drama de fantasia criada por Lauren Schmidt Hissrich para a Netflix. É baseada na série de livros de mesmo nome de Andrzej Sapkowski.', 2, (SELECT id FROM "gender" WHERE "gender" = 'Fantasia' LIMIT 1)),
        ('Stranger Things', 'https://i.scdn.co/image/ab67616d0000b273bd0db295c0164ddbc0584ebb', 'Stranger Things é uma série de televisão americana de ficção científica e terror criada, escrita e dirigida pelos irmãos Duffer e co-produzida pela 21 Laps Entertainment e pela Monkey Massacre Productions.', 3, (SELECT id FROM "gender" WHERE "gender" = 'Ficção Científica' LIMIT 1)),
        ('The Crown', 'https://m.media-amazon.com/images/I/81C0q-qLZ+L._AC_UF1000,1000_QL80_.jpg', 'The Crown é uma série de televisão de drama biográfico sobre o reinado da rainha Elizabeth II. A série foi criada e escrita por Peter Morgan para a Netflix.', 4, (SELECT id FROM "gender" WHERE "gender" = 'Drama' LIMIT 1)),
        ('The Umbrella Academy', 'https://m.media-amazon.com/images/M/MV5BMzlmMmIxODItYzBjNC00YjMwLWIwOTAtNzVlMTBlNTNkMjZjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 'The Umbrella Academy é uma série de televisão americana desenvolvida por Steve Blackman para a Netflix. É uma adaptação da série de quadrinhos de mesmo nome criada por Gerard Way e Gabriel Bá.', 2, (SELECT id FROM "gender" WHERE "gender" = 'Ficção Científica' LIMIT 1))
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "serie"`);
  }
}
