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
import { ListSerieEntity } from '../list-serie/list-serie.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'serie' })
export class SerieEntity {
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

  @Column({ name: 'seasons', type: 'int', nullable: false })
  seasons: number;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // varias series podem ter um genero
  @ManyToOne(() => GenderEntity, (gender) => gender.series)
  gender: GenderEntity;

  // uma serie pode estar em varias Listas de series
  @ManyToOne(() => ListSerieEntity, (listSeries) => listSeries.serie)
  listSeries: ListSerieEntity;
}
