import Book from '@modules/books/infra/typeorm/entities/Book';
import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import IRemoveUserDTO from '../dtos/IRemoveUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';
import IFavoritesBooksDTO from '../dtos/IFavoritesBooksDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  remove(data: IRemoveUserDTO): Promise<boolean>;
  findAll(data: IFindAllUsersDTO): Promise<User[]>;

  // salvei aqui porque é o usuário que contém a lista de seus livros favoritos
  favoritesBooks(data: IFavoritesBooksDTO): Promise<Book[]>;
}
