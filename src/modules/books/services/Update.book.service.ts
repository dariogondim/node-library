import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import IUpdateBookDTO from '../dtos/IUpdate.book.dto';

interface IRequest extends IUpdateBookDTO {
  id: string;
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
    id,
    name,
    isbn,
    title,
    category,
    edition,
    author,
    publishing,
    editionYear,
    numberPages,
    user_id,
  }: IRequest): Promise<IResponse> {}
}
