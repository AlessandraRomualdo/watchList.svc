import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { MovieEntity } from '../movie/movie.entity';

@Entity({ name: 'list_movie' })
export class ListMovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // Uma lista de filmes pertence a uma lista
  @ManyToOne(() => ListEntity, (list) => list.listMovies)
  list: ListEntity;

  // Um filme pode aparecer em várias listas
  @ManyToOne(() => MovieEntity, (movie) => movie.listMovies)
  movie: MovieEntity;
}
