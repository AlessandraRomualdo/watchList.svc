import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedersMovie1723410168925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "movie" ("title", "poster", "description", "genderId") VALUES 
              ('O castelo animado', 'https://drive.google.com/file/d/14mCtPIYBrBxZ175GdfuSPBQtK-dtZ3y_/view?usp=drive_link', 'Uma bruxa lança uma terrível maldição sobre a jovem Sophie transformando-a em uma velha. Desesperada, ela embarca em uma odisseia em busca do mago Howl, um misterioso feiticeiro que pode ajudá-la a reverter o feitiço.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('O Túmulo dos Vagalumes', 'https://drive.google.com/file/d/1-nItx-qsx1AyZvQ68Rzg2Bsl53pt-pYT/view?usp=drive_link', 'Os irmão Setsuko e Seita vivem no Japão em meio a Segunda Guerra Mundial. Após a morte da mãe em um bombardeio e a convocação do pai para a Guerra, eles vão morar com alguns parentes. Insatisfeitos, saem da cidade e acabam em um abrigo na floresta.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('Princesa Mononoke', 'https://drive.google.com/file/d/1RSfWryPRQjaAyw6cud9goq0R_0TKyvnA/view?usp=drive_link', 'Um príncipe, em busca de uma cura, luta em uma guerra entre a mata e uma colônia mineira. Nesta aventura ele conhece Mononoke.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('O Castelo no Céu', 'https://drive.google.com/file/d/1n3dmvG3tJvbX9B-e8bE5CdlOlUBRJipo/view?usp=drive_link', 'Sheeta, uma jovem órfã que possui um colar misterioso se une ao mineiro Pazu para procurar uma lendária cidade flutuante. Mas a dupla é perseguida por gananciosos piratas aéreos.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('A viagem de Chihiro', 'https://drive.google.com/file/d/1oKczyvb1pQNeoQOYStY50n8iRLSaYusT/view?usp=drive_link', 'Chihiro e seus pais estão se mudando para uma cidade diferente. A caminho da nova casa, o pai decide pegar um atalho. Eles se deparam com uma mesa repleta de comida, embora ninguém esteja por perto. Chihiro sente o perigo, mas seus pais começam a comer. Quando anoitece, eles se transformam em porcos. Agora, apenas Chihiro pode salvá-los.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('O Serviço de Entregas da Kiki', 'https://drive.google.com/file/d/1Az6cD6VCmZrnXuWtQjq21OIp_qa5lnzG/view?usp=drive_link', 'Por ordem de sua mãe, Kiki parte para um aprendizado de um ano, acompanhada por seu gato preto. A um comando de sua vassoura mágica, ela vai parar na charmosa cidadezinha de Moreoastal. Infelizmente, os hotéis locais não aceitam bruxas e a polícia a flagra fazendo algumas travessuras.', (SELECT id FROM "gender" WHERE "gender" = 'Animação')),
              ('Dunkirk', 'https://drive.google.com/file/d/1iWkfTqhMFTjyBZ-kkbIBMKLbCMCEgTSE/view?usp=drive_link', 'Durante a Segunda Guerra Mundial, a Alemanha avança rumo à França e cerca as tropas aliadas nas praias de Dunkirk. Sob cobertura aérea e terrestre das forças britânicas e francesas, as tropas são lentamente evacuadas da praia.', (SELECT id FROM "gender" WHERE "gender" = 'Guerra'))
              `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "movie" WHERE "title" IN ('O castelo animado', 'O Túmulo dos Vagalumes', 'Princesa Mononoke', 'O Castelo no Céu')`,
    );
  }
}
