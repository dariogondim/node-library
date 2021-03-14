import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreateBookDTO from '../dtos/ICreate.book.dto';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import SharedBookService from './shared/shared.book.service';

type IRequest = ICreateBookDTO;
type IResponse = Book;

@injectable()
export default class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({
    isbn,
    title,
    category,
    edition,
    author,
    publishing,
    editionYear,
    numberPages,
  }: IRequest): Promise<IResponse> {
    // bussiness roles

    const alreadyBookRegistered = await container
      .resolve(SharedBookService)
      .filterBookByIsbn({ isbn, booksRepository: this.booksRepository });

    if (alreadyBookRegistered) {
      throw new AppError('The book already registered');
    }

    const book = await this.booksRepository.create({
      isbn,
      title,
      category,
      edition,
      author,
      publishing,
      editionYear,
      numberPages,
    });

    return book;
  }
}
