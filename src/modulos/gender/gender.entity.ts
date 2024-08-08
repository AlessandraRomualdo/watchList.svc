import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { MovieEntity } from '../movie/movie.entity';
import { SerieEntity } from '../serie/serie.entity';

@Entity({ name: 'gender' })
export class GenderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'gender', type: 'varchar', length: 25, nullable: false })
  gender: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // um genero pode ter varios filmes
  @OneToMany(() => MovieEntity, (movie) => movie.gender)
  movies: MovieEntity[];

  // um genero pode ter varias series
  @OneToMany(() => SerieEntity, (serie) => serie.gender)
  series: SerieEntity[];
}
