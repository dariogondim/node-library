import ICreateBookDTO from '@modules/books/dtos/ICreate.book.dto';
import IFilterBookDTO from '@modules/books/dtos/IFilter.book.dto';
import IFindAllBookDTO from '@modules/books/dtos/IFindAll.book.dto';
import IFindByIdBookDTO from '@modules/books/dtos/IFindById.book.dto';
import IRemoveBookDTO from '@modules/books/dtos/IRemove.book.dto';
import IUpdateBookDTO from '@modules/books/dtos/IUpdate.book.dto';
import Book from '@modules/books/infra/typeorm/entities/Book';
import fakeDatabase from '@shared/providers/fakes/FakeDatabase';
import { uuid } from 'uuidv4';
import IBooksRepository from '../IBooks.repository';

export default class FakeBooksRepository implements IBooksRepository {
  public async create(data: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, { id: uuid() }, data);

    fakeDatabase.fakeBooks.push({ ...book });

    return fakeDatabase.fakeBooks[fakeDatabase.fakeBooks.length - 1];

    // const book = this.ormRepository.create(data);
    // await this.ormRepository.save(book);

    // return book;
  }

  public async update(data: IUpdateBookDTO): Promise<Book> {
    const bookUpdated = fakeDatabase.fakeBooks.map(book => {
      if (book.id === data.id) {
        const { created_at, updated_at } = book;
        return { ...data, created_at, updated_at };
      }
      return book;
    });

    return bookUpdated[0];

    // const book = await this.ormRepository.save(data);

    // return book;
  }

  public async find(data: IFindByIdBookDTO): Promise<Book | undefined> {
    const books = fakeDatabase.fakeBooks.filter(book => book.id === data.id);

    return books[0];
    // const { id } = data;
    // const book = await this.ormRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    // return book;
  }

  public async filter(data: IFilterBookDTO): Promise<Book[]> {
    if (data.filterConditions && data.filterConditions[0].isbn) {
      const { isbn } = data.filterConditions[0];
      const books = fakeDatabase.fakeBooks.filter(book => book.isbn === isbn);

      return books;
    }

    return fakeDatabase.fakeBooks; // não faz sentido testar os  outros filtros nesse caso

    // const { filterConditions, onlyFields } = data;

    // let filter: FindOneOptions<Book> | undefined;

    // if (filterConditions && onlyFields) {
    //   filter = {
    //     where: filterConditions,
    //     select: onlyFields,
    //   };
    // } else if (filterConditions) {
    //   filter = {
    //     where: filterConditions,
    //   };
    // } else if (onlyFields) {
    //   filter = {
    //     select: onlyFields,
    //   };
    // } else {
    //   filter = undefined;
    // }

    // const products = await this.ormRepository.find(filter);

    // return products;
  }

  public async remove(data: IRemoveBookDTO): Promise<boolean> {
    const bookToRemove = fakeDatabase.fakeBooks.filter(
      book => book.id === data.id,
    );

    if (bookToRemove) {
      fakeDatabase.fakeBooks = fakeDatabase.fakeBooks.filter(
        book => book.id !== bookToRemove[0].id,
      );
    }

    const bookRemoved = fakeDatabase.fakeBooks.filter(
      book => book.id === data.id,
    );

    return !bookRemoved[0];

    // const { id } = data;
    // await this.ormRepository.delete(id);
    // const book = await this.ormRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    // return !book;
  }

  public async findAll(data: IFindAllBookDTO): Promise<Book[]> {
    return fakeDatabase.fakeBooks; // a parte do teste com limites e ofsset, não faz sentido testar aqui
    // const { limitResults, offset } = data;

    // const books = await this.ormRepository.find({
    //   take: limitResults,
    //   skip: offset,
    // });

    // return books;
  }
}
