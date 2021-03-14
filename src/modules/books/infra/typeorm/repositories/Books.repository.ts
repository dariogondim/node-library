import ICreateBookDTO from '@modules/books/dtos/ICreate.book.dto';
import IFilterBookDTO from '@modules/books/dtos/IFilter.book.dto';
import IFindAllBookDTO from '@modules/books/dtos/IFindAll.book.dto';
import IFindByIdBookDTO from '@modules/books/dtos/IFindById.book.dto';
import IRemoveBookDTO from '@modules/books/dtos/IRemove.book.dto';
import IUpdateBookDTO from '@modules/books/dtos/IUpdate.book.dto';
import IBooksRepository from '@modules/books/repositories/IBooks.repository';
import { Repository, getRepository, FindOneOptions } from 'typeorm';

import Book from '../entities/Book';

export default class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async create(data: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create(data);
    await this.ormRepository.save(book);

    return book;
  }

  public async update(data: IUpdateBookDTO): Promise<Book> {
    const book = await this.ormRepository.save(data);

    return book;
  }

  public async find(data: IFindByIdBookDTO): Promise<Book | undefined> {
    const { id } = data;
    const book = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return book;
  }

  public async filter(data: IFilterBookDTO): Promise<Book[]> {
    const { filterConditions, onlyFields } = data;

    let filter: FindOneOptions<Book> | undefined;

    if (filterConditions && onlyFields) {
      filter = {
        where: filterConditions,
        select: onlyFields,
      };
    } else if (filterConditions) {
      filter = {
        where: filterConditions,
      };
    } else if (onlyFields) {
      filter = {
        select: onlyFields,
      };
    } else {
      filter = undefined;
    }

    const products = await this.ormRepository.find(filter);

    return products;
  }

  public async remove(data: IRemoveBookDTO): Promise<boolean> {
    const { id } = data;
    await this.ormRepository.delete(id);
    const book = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return !book;
  }

  public async findAll(data: IFindAllBookDTO): Promise<Book[]> {
    const { limitResults, offset } = data;

    const books = await this.ormRepository.find({
      take: limitResults,
      skip: offset,
    });

    return books;
  }
}
