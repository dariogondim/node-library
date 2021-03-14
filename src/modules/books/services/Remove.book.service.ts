import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBooksRepository from '../repositories/IBooks.repository';
import IRemoveBookDTO from '../dtos/IRemove.book.dto';

type IRequest = IRemoveBookDTO;
type IResponse = boolean;

@injectable()
export default class FindByIdBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {}
}
