import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import IFindByIdBookDTO from '../dtos/IFindById.book.dto';

interface IRequest extends IFindByIdBookDTO {
  user_id: string;
}
type IResponse = Book;

@injectable()
export default class FindByIdBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IResponse> {
    const book = await this.booksRepository.find({
      id,
    });

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    return book;
  }
}
