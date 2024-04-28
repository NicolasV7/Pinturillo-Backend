import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  Column,
  ManyToOne,
} from "typeorm";

import { Word } from "@entity/word.entity";
import { Category } from "@entity/category.entity";

@Entity({ name: "word_category" })
export class WordCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  id_category: string;

  @Column({ nullable: false })
  id_word: string;

  @ManyToOne(() => Category, (category) => category.id, { nullable: false })
  @JoinColumn({ name: "id_category" })
  categories: Category[];

  @ManyToOne(() => Word, (word) => word.id, { nullable: false })
  @JoinColumn({ name: "id_word" })
  words: Word[];
}
