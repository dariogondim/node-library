import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IRemoveUserDTO from '@modules/users/dtos/IRemoveUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(data: IRemoveUserDTO): Promise<boolean> {
    const userToRemove = this.users.filter(book => book.id === data.id);

    if (userToRemove) {
      this.users = this.users.filter(book => book.id !== userToRemove[0].id);
    }

    const bookRemoved = this.users.filter(book => book.id === data.id);

    return !bookRemoved[0];

    // const { id } = data;
    // await this.ormRepository.delete(id);
    // const user = await this.ormRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });
    // return !user;
  }

  public async findAll(data: IFindAllUsersDTO): Promise<User[]> {
    return this.users; // a parte do teste com limites e ofsset, não faz sentido testar aqui
    // const { limitResults, offset } = data;

    //   const users = await this.ormRepository.find({
    //     take: limitResults,
    //     skip: offset,
    //   });

    //   return users;
  }
}

export default FakeUsersRepository;
