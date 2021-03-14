import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import RemoveProfileService from '@modules/users/services/RemoveProfileService';
import CreateFavoriteBooksListService from '@modules/users/services/CreateFavoriteBooksListService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({
      user_id,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, phone, age, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      phone,
      age,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { password } = request.body;

    const removeProfile = container.resolve(RemoveProfileService);

    const user = await removeProfile.execute({
      user_id,
      password,
    });

    return response.json(classToClass(user));
  }

  public async favorites(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { booksIds } = request.body;
    const user_id = request.user.id;

    const messageSuccess = await container
      .resolve(CreateFavoriteBooksListService)
      .execute({ booksIds, user_id });

    return response.json({ message: messageSuccess });
  }
}
