import { injectable } from 'tsyringe';

import IBooksRepository from '@modules/books/repositories/IBooks.repository';

@injectable()
export default class SharedBookService {
  public async validateOriginTransaction({
    isbn,
    booksRepository,
  }: {
    isbn: string;
    booksRepository: IBooksRepository;
  }): Promise<boolean> {}
}
