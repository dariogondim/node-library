import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Book from '@modules/books/infra/typeorm/entities/Book';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'favoriteBooks' })
  getFavoriteBooks(): Book[] {
    return this.books || [];
  }
}

export default User;
