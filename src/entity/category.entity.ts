import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
  } from 'typeorm';
import { Word } from './word.entity';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar' ,unique:true ,nullable: false })
  name: string;

  @ManyToMany(() => Word, (word) => word.categories, {eager: true})
  words: Word[];

}