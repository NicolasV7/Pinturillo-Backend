import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Word } from "@entity/word.entity";

@Entity({ name: "Category" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  name: string;

  @ManyToMany(() => Word, (word) => word.categories, { eager: true })
  words: Word[];
}
