import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import IUpdateBookDTO from '../dtos/IUpdate.book.dto';
import SharedBookService from './shared/shared.book.service';
import FindByIdBookService from './findById.book.service';

interface IRequest extends IUpdateBookDTO {
  id: string;
}

type IResponse = Book;

@injectable()
export default class UpdateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({
    id,
    isbn,
    title,
    category,
    edition,
    author,
    publishing,
    editionYear,
    numberPages,
  }: IRequest): Promise<IResponse> {
    const bookToUpdated = await this.booksRepository.find({
      id,
    });

    if (!bookToUpdated) {
      throw new AppError('Book not found', 404);
    }

    const bookRegistered = await container
      .resolve(SharedBookService)
      .filterBookByIsbn({ isbn, booksRepository: this.booksRepository });

    const alreadyOtherBookRegistered =
      bookRegistered && bookRegistered.id !== id;

    if (alreadyOtherBookRegistered) {
      throw new AppError('The book already registered');
    }

    const book = await this.booksRepository.update({
      id,
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
