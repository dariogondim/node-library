import Book from '@modules/books/infra/typeorm/entities/Book';
import { uuid } from 'uuidv4';

/* eslint-disable import/prefer-default-export */
export const fakeBook1 = {
  id: undefined as any, // vai ser preenchido depois
  isbn: uuid(),
  title: "Harry Potter and the Philosopher's Stone",
  category: 'Fantasy',
  edition: '2013 edition',
  author: 'J. K. Rowling',
  publishing: 'Scholastic',
  editionYear: 1998,
  numberPages: 336,
};

export const fakeBook2 = {
  id: undefined as any, // vai ser preenchido depois
  isbn: uuid(),
  title: "Harry Potter and the Philosopher's Stone (book 1)",
  category: 'Fantasy',
  edition: '2016 edition',
  author: 'J. K. Rowling',
  publishing: 'Scholastic',
  editionYear: 2001,
  numberPages: 336,
};

export const fakeUser1 = {
  name: 'Dario Gondim',
  email: `${uuid()}@gmail.com`,
  password: '123456',
  phone: '85988776655',
  age: 29,
};

export const fakeUser2 = {
  name: 'Dario Gondim',
  email: `${uuid()}@gmail.com`,
  password: '123456',
  phone: '85988776655',
  age: 29,
};

export const fakeUser3 = {
  name: 'Dario Gondim',
  email: `${uuid()}@gmail.com`,
  password: '123456',
  phone: '85988776655',
  age: 29,
  books: [] as Book[],
};
