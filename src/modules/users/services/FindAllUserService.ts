import { injectable, inject, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import SharedBookService from '@modules/books/services/shared/shared.book.service';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest extends Omit<IFindAllUsersDTO, 'offset'> {
  resultsPerPage: number;
  firstPage: number;
}

type IResponse = User[];

@injectable()
export default class FindAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const users = await this.usersRepository.findAll({
      limitResults,
      offset,
    });

    return users;
  }
}
