import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import IFindAllBookDTO from '../dtos/IFindAll.book.dto';

type IRequest = IFindAllBookDTO;
type IResponse = Book[];

@injectable()
export default class FindAllBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({
    limitResults,
    offset,
  }: IRequest): Promise<IResponse> {}
}
