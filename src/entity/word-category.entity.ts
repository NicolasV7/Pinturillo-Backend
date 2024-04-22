import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    JoinColumn,
    ManyToMany,
  } from 'typeorm';

import { Word } from './word.entity';
import { Category } from './category.entity';

@Entity({ name: 'WordCategory' })
export class WordCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Word, (word) => word.id)
  @JoinColumn({ name: 'idWord' })
  idWord: Word;

  @ManyToMany(() => Category, (category) => category.id)
  @JoinColumn({ name: 'idCategory' })
  idCategory: Category;

}