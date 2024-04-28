import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./category.entity";

@Entity({ name: 'game_room' })
export class GameRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', nullable: false })
  name?: string;

  @Column({type:'varchar', default:'Sin iniciar' ,nullable: false, enum: ['Sin iniciar', 'en curso', 'finalizado'] })
  state: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'id_category' })
  idCategory: Category;
}
