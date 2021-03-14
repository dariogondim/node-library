import AppError from '@shared/errors/AppError';
import { fakeUser1, fakeUser2 } from '@shared/providers/fakes/FakeObjs';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FindAllUserService from './FindAllUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let findAllService: FindAllUserService;
let createService: CreateUserService;

describe('FindAllUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    findAllService = new FindAllUserService(fakeUsersRepository);
    createService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('FIND ALL:users RETURN an EMPTY ARRAY', async () => {
    const findAllUsers = await findAllService.execute({
      limitResults: 10, // valores irrelevantes
      resultsPerPage: 2, // valores irrelevantes
      firstPage: 1, // valores irrelevantes
    });

    await expect(findAllUsers).toEqual([]); // um array vazio
  });

  it('FIND ALL:users RETURN objects equal the OBJECTS INSERTED', async () => {
    const user = await createService.execute({ ...fakeUser1 });
    const user2 = await createService.execute({ ...fakeUser2 });
    const findAllUsers = await findAllService.execute({
      limitResults: 10, // valores irrelevantes
      resultsPerPage: 2, // valores irrelevantes
      firstPage: 1, // valores irrelevantes
    });

    await expect(findAllUsers).toEqual([{ ...user }, { ...user2 }]); // um array com um elemento exatamente igual ao usuários recém inserido
  });
});
