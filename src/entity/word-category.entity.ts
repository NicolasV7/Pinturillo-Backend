import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    Column,
    ManyToOne,
  } from 'typeorm';

import { Word } from "./word.entity";
import { Category } from "./category.entity";

@Entity({ name: 'word_category' })
export class WordCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false })
  id_category: string;

  @Column({nullable: false })
  id_word: string;

  @ManyToOne(() => Category, (category) => category.id, {nullable: false})
  @JoinColumn({ name: 'id_category' })
  categories: Category[];

  @ManyToOne(() => Word, (word) => word.id, {nullable: false})
  @JoinColumn({ name: 'id_word' })
  words: Word[];

}
