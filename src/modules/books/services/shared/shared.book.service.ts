import { injectable } from 'tsyringe';

import IBooksRepository from '@modules/books/repositories/IBooks.repository';

@injectable()
export default class SharedBookService {
  public async alreadyBookRegistered({
    isbn,
    booksRepository,
  }: {
    isbn: string;
    booksRepository: IBooksRepository;
  }): Promise<boolean> {
    const alreadyBookRegistered = await booksRepository.filter({
      filterConditions: [{ isbn }],
    });

    return !!alreadyBookRegistered[0];
  }
}
