import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ListEntity } from '../list/list.entity';
import { RoleEntity } from '../role/role.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 150, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 150, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 150, nullable: false })
  password: string;

  @Column({ name: 'birth_date', type: 'date', nullable: false })
  birthDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // um usuario pode ter varias listas
  @OneToMany(() => ListEntity, (list) => list.user)
  lists: ListEntity[];

  // um usuario poder ter uma role
  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}
