import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooks.repository';
import IFindAllBookDTO from '../dtos/IFindAll.book.dto';
import SharedBookService from './shared/shared.book.service';

interface IRequest extends Omit<IFindAllBookDTO, 'offset'> {
  resultsPerPage: number;
  firstPage: number;
}

type IResponse = Book[];

@injectable()
export default class FindAllBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({
    limitResults,
    resultsPerPage,
    firstPage,
  }: IRequest): Promise<IResponse> {
    // bussiness roles

    const offset = container
      .resolve(SharedBookService)
      .getOffset(resultsPerPage, firstPage);

    const books = await this.booksRepository.findAll({
      limitResults,
      offset,
    });

    return books;
  }
}
