import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBooksRepository from '../repositories/IBooks.repository';
import IRemoveBookDTO from '../dtos/IRemove.book.dto';

type IRequest = IRemoveBookDTO;

type IResponse = Promise<string>;

@injectable()
export default class RemoveBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    // bussiness roles

    const bookFound = await this.booksRepository.find({
      id,
    });

    if (!bookFound) {
      throw new AppError('book not found', 404);
    }

    const bookRemoved = await this.booksRepository.remove({
      id,
    });

    if (!bookRemoved) {
      throw new AppError('The book has not been removed');
    }

    return 'Book removed sucess!';
  }
}
