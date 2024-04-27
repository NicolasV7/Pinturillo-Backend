import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

import { Category } from './category.entity';

@Entity({ name: 'GameRoom' })
export class GameRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name?: string;

  @Column({ default:'Sin iniciar' ,nullable: false, enum: ['Sin iniciar', 'en curso', 'finalizado'] })
  state: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'idCategory' })
  idCategory: Category;


}