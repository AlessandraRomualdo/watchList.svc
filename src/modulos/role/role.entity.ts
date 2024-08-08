import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEnum } from './enum/role.enum';
import { UserEntity } from '../user/user.entity';

// entidade que representa a tabela role no banco de dados com os campos id, name, createdAt, updatedAt e deletedAt (para soft delete) e suas respectivas anotações do TypeORM para mapeamento da tabela no banco de dados
@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role', enum: RoleEnum, nullable: false })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // uma role pode ter varios usuarios
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
