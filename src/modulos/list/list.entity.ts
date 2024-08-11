import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ListMovieEntity } from '../list-movie/list-movie.entity';
import { ListSerieEntity } from '../list-serie/list-serie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'list' })
export class ListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 150, nullable: false })
  name: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // Um usuário pode ter várias listas, mas uma lista pertence a um usuário
  @ManyToOne(() => UserEntity, (user) => user.lists)
  user: UserEntity;

  // Uma lista pode ter vários filmes através de ListMovieEntity
  @OneToMany(() => ListMovieEntity, (listMovie) => listMovie.list)
  listMovies: ListMovieEntity[];

  // Uma lista pode ter várias séries através de ListSerieEntity
  @OneToMany(() => ListSerieEntity, (listSerie) => listSerie.list)
  listSeries: ListSerieEntity[];
}
