import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('books')
export default class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  edition: string;

  @Column()
  author: string;

  @Column()
  publishing: string;

  @Column()
  editionYear: number;

  @Column()
  numberPages: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
