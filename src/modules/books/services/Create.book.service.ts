import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreateBookDTO from '../dtos/ICreate.book.dto';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';

interface IRequest extends ICreateBookDTO {
  user_id: string;
}
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
    user_id,
  }: IRequest): Promise<IResponse> {
    // bussiness roles

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
