import { injectable } from 'tsyringe';

import IBooksRepository from '@modules/books/repositories/IBooks.repository';
import Book from '@modules/books/infra/typeorm/entities/Book';

@injectable()
export default class SharedBookService {
  public async filterBookByIsbn({
    isbn,
    booksRepository,
  }: {
    isbn: string;
    booksRepository: IBooksRepository;
  }): Promise<Book> {
    const booksFilterered = await booksRepository.filter({
      filterConditions: [{ isbn }], // só existe, pois isbn é único
    });

    return booksFilterered[0];
  }

  public getOffset(resultsPerPage: number, firstPage: number): number {
    return resultsPerPage * (firstPage - 1);
  }
}
