import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Category } from "./category.entity";

@Entity({ name: "game_room" })
export class GameRoom extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  room_name: string;

  @Column({
    type: "varchar",
    default: "Sin iniciar",
    nullable: false,
    enum: ["Sin iniciar", "en curso", "finalizado"],
  })
  state: string;

  @Column({name : "id_category", nullable: false, type: "uuid"})
  id_category: string;

  @ManyToOne(() => Category, {nullable: false, eager: true})
  @JoinColumn({ name: "id_category" })
  categories?: Category[];

}
