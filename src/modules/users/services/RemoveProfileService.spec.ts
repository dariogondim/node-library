import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import RemoveProfileService from './RemoveProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let removeProfile: RemoveProfileService;

describe('RemoveProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    removeProfile = new RemoveProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to remove the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '95989980001',
      age: 30,
    });

    const removeUser = removeProfile.execute({
      user_id: user.id,
      password: '123456',
    });

    await expect(removeUser).resolves.not.toThrowError(); // que não lançe um erro
  });

  it('should not be able to remove the profile from a non-existing user', async () => {
    await expect(
      removeProfile.execute({
        user_id: 'non-existing-user-id',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to remove the profile with a incorrect password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '95989980001',
      age: 30,
    });

    await expect(
      removeProfile.execute({
        user_id: user.id,
        password: 'wrong password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
