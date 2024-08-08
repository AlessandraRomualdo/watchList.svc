import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
} from 'typeorm';
import { GenderEntity } from '../gender/gender.entity';
import { ListMovieEntity } from '../list-movie/list-movie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ name: 'poster', type: 'varchar', length: 500, nullable: false })
  poster: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 500,
    nullable: false,
  })
  description: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // varios movies podem ter um genero
  @ManyToOne(() => GenderEntity, (gender) => gender.movies)
  gender: GenderEntity;

  // um filme pode estar em varias Listas de filmes
  @ManyToOne(() => ListMovieEntity, (listMovies) => listMovies.movie)
  listMovies: ListMovieEntity;
}
