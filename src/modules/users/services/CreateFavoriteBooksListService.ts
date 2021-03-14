import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Book from '@modules/books/infra/typeorm/entities/Book';
import IUsersRepository from '../repositories/IUsersRepository';
import IFavoritesBooksDTO from '../dtos/IFavoritesBooksDTO';

interface IRequest extends IFavoritesBooksDTO {
  user_id: string;
}

type IResponse = Promise<string>;

@injectable()
class CreateFavoriteBooksListService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ booksIds, user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    user.books = booksIds.map(id => {
      return Object.assign(new Book(), { id });
    });

    const userSaveSucessBooksFavorites = this.usersRepository.save(user);

    if (!userSaveSucessBooksFavorites) {
      throw new AppError(
        'One or more books do not exist or have already been added to favorites',
      );
    }
    return 'books have been successfully bookmarked';
  }
}

export default CreateFavoriteBooksListService;
