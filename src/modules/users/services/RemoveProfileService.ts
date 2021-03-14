import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  password: string;
}

type IResponse = Promise<string>;

@injectable()
class RemoveProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!password) {
      throw new AppError('You need to inform password to remove user');
    }

    const checkPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!checkPassword) {
      throw new AppError('password does not match.');
    }

    const userRemoved = await this.usersRepository.remove({
      id: user_id,
    });

    if (!userRemoved) {
      throw new AppError('The user has not been removed');
    }

    return 'User removed sucess!';
  }
}

export default RemoveProfileService;
