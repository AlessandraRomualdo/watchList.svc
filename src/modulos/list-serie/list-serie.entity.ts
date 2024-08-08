import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { SerieEntity } from '../serie/serie.entity';

@Entity({ name: 'list_serie' })
export class ListSerieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // Uma lista de series pertence a uma lista
  @ManyToOne(() => ListEntity, (list) => list.listSeries)
  list: ListEntity;

  // Uma serie pode aparecer em várias listas
  @ManyToOne(() => SerieEntity, (serie) => serie.listSeries)
  serie: SerieEntity;
}
