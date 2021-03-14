import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IBooksRepository from '../repositories/IBooks.repository';
import IRemoveBookDTO from '../dtos/IRemove.book.dto';

interface IRequest extends IRemoveBookDTO {
  user_id: string;
}

type IResponse = boolean;

@injectable()
export default class RemoveBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<IResponse> {}
}
